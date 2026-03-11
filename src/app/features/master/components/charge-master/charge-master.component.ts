import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargeService } from '../../../../core/services/charge.service';
import { Charge } from '../../../../core/models/charge';

@Component({
  selector: 'app-charge-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './charge-master.component.html',
  styleUrls: [
    './charge-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class ChargeMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  name = '';
  chargeType = 'Flat';
  value: number | null = null;
  isActive = true;

  submitted = false;
  error = '';
  showConfirm = false;
  isEditMode = false;
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  chargeTypeOptions = ['Flat', 'Percentage'];

  constructor(private chargeService: ChargeService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem('editCharge');
      if (stored) {
        this.loadEditState(JSON.parse(stored));
        sessionStorage.removeItem('editCharge');
      }
    }
  }

  private loadEditState(charge: Charge): void {
    this.name = charge.name;
    this.chargeType = charge.chargeType;
    this.value = charge.value;
    this.isActive = charge.isActive;
    this.isEditMode = true;
    this.editingId = charge.chargeId;
  }

  save(): void {
    this.submitted = true;
    this.error = '';
    this.showConfirm = false;

    if (!this.name.trim()) {
      this.error = 'Name is required.';
      this.showConfirm = true;
      return;
    }
    if (this.value === null || this.value === undefined || isNaN(Number(this.value))) {
      this.error = 'Value is required.';
      this.showConfirm = true;
      return;
    }

    const payload: Partial<Charge> = {
      name: this.name.trim(),
      chargeType: this.chargeType,
      value: Number(this.value),
      isActive: this.isActive
    };

    if (this.isEditMode && this.editingId !== null) {
      this.chargeService.updateCharge(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Charge updated successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to update charge.'; }
      });
    } else {
      this.chargeService.addCharge(payload).subscribe({
        next: () => {
          this.successMessage = 'Charge added successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to add charge.'; }
      });
    }
  }

  cancel(): void { this.resetForm(); this.showConfirm = false; }

  private resetForm(): void {
    this.name = '';
    this.chargeType = 'Flat';
    this.value = null;
    this.isActive = true;
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}

