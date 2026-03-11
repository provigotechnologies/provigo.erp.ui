import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountService } from '../../../../core/services/discount.service';
import { Discount } from '../../../../core/models/discount';

@Component({
  selector: 'app-manage-discounts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-discounts.component.html',
  styleUrls: [
    './manage-discounts.component.css',
    '../../../styles/mastermanage-style.css'
  ]
})
export class ManageDiscountsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  discountList: Discount[] = [];
  filteredList: Discount[] = [];
  searchTerm = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showConfirmDelete = false;
  confirmDeleteId: number | null = null;

  constructor(private discountService: DiscountService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDiscounts();
    }
  }

  loadDiscounts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.discountService.getDiscounts().subscribe({
      next: (data) => {
        this.discountList = data;
        this.filteredList = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load discounts.';
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredList = term
      ? this.discountList.filter(d => d.name.toLowerCase().includes(term))
      : [...this.discountList];
  }

  editDiscount(discount: Discount): void {
    sessionStorage.setItem('editDiscount', JSON.stringify(discount));
    this.router.navigate(['/master/discount-master']);
  }

  deleteDiscount(id: number): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.discountService.deleteDiscount(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Discount deleted successfully!';
          this.loadDiscounts();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to delete discount.'; }
      });
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.showConfirmDelete = false;
  }
}

