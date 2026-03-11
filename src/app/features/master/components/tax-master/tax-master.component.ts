import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxService } from '../../../../core/services/tax.service';
import { Tax } from '../../../../core/models/tax';

@Component({
  selector: 'app-tax-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tax-master.component.html',
  styleUrls: [
    './tax-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class TaxMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  name = '';
  rate: number | null = null;
  isActive = true;

  submitted = false;
  error = '';
  showConfirm = false;
  isEditMode = false;
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private taxService: TaxService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem('editTax');
      if (stored) {
        this.loadEditState(JSON.parse(stored));
        sessionStorage.removeItem('editTax');
      }
    }
  }

  private loadEditState(tax: Tax): void {
    this.name = tax.name;
    this.rate = tax.rate;
    this.isActive = tax.isActive;
    this.isEditMode = true;
    this.editingId = tax.taxId;
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
    if (this.rate === null || this.rate === undefined || isNaN(Number(this.rate))) {
      this.error = 'Rate is required.';
      this.showConfirm = true;
      return;
    }

    const payload: Partial<Tax> = {
      name: this.name.trim(),
      rate: Number(this.rate),
      isActive: this.isActive
    };

    if (this.isEditMode && this.editingId !== null) {
      this.taxService.updateTax(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Tax updated successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to update tax.'; }
      });
    } else {
      this.taxService.addTax(payload).subscribe({
        next: () => {
          this.successMessage = 'Tax added successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to add tax.'; }
      });
    }
  }

  cancel(): void { this.resetForm(); this.showConfirm = false; }

  private resetForm(): void {
    this.name = '';
    this.rate = null;
    this.isActive = true;
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}

