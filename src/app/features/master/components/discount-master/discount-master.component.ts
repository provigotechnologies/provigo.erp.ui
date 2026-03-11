import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from '../../../../core/services/discount.service';
import { Discount } from '../../../../core/models/discount';

@Component({
  selector: 'app-discount-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './discount-master.component.html',
  styleUrls: [
    './discount-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class DiscountMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  name = '';
  type = 'Percentage';
  value: number | null = null;
  isActive = true;

  submitted = false;
  error = '';
  showConfirm = false;
  isEditMode = false;
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  typeOptions = ['Percentage', 'Flat'];

  constructor(private discountService: DiscountService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem('editDiscount');
      if (stored) {
        this.loadEditState(JSON.parse(stored));
        sessionStorage.removeItem('editDiscount');
      }
    }
  }

  private loadEditState(discount: Discount): void {
    this.name = discount.name;
    this.type = discount.type;
    this.value = discount.value;
    this.isActive = discount.isActive;
    this.isEditMode = true;
    this.editingId = discount.discountId;
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

    const payload: Partial<Discount> = {
      name: this.name.trim(),
      type: this.type,
      value: Number(this.value),
      isActive: this.isActive
    };

    if (this.isEditMode && this.editingId !== null) {
      this.discountService.updateDiscount(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Discount updated successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to update discount.'; }
      });
    } else {
      this.discountService.addDiscount(payload).subscribe({
        next: () => {
          this.successMessage = 'Discount added successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to add discount.'; }
      });
    }
  }

  cancel(): void { this.resetForm(); this.showConfirm = false; }

  private resetForm(): void {
    this.name = '';
    this.type = 'Percentage';
    this.value = null;
    this.isActive = true;
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}

