import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxService } from '../../../../core/services/tax.service';
import { Tax } from '../../../../core/models/tax';

@Component({
  selector: 'app-manage-taxes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-taxes.component.html',
  styleUrls: [
    './manage-taxes.component.css',
    '../../../styles/mastermanage-style.css'
  ]
})
export class ManageTaxesComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  taxList: Tax[] = [];
  filteredList: Tax[] = [];
  searchTerm = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showConfirmDelete = false;
  confirmDeleteId: number | null = null;

  constructor(private taxService: TaxService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTaxes();
    }
  }

  loadTaxes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.taxService.getTaxes().subscribe({
      next: (data) => {
        this.taxList = data;
        this.filteredList = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load taxes.';
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredList = term
      ? this.taxList.filter(t => t.name.toLowerCase().includes(term))
      : [...this.taxList];
  }

  editTax(tax: Tax): void {
    sessionStorage.setItem('editTax', JSON.stringify(tax));
    this.router.navigate(['/master/tax-master']);
  }

  deleteTax(id: number): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.taxService.deleteTax(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Tax deleted successfully!';
          this.loadTaxes();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to delete tax.'; }
      });
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.showConfirmDelete = false;
  }
}

