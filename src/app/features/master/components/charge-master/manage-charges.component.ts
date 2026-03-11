import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargeService } from '../../../../core/services/charge.service';
import { Charge } from '../../../../core/models/charge';

@Component({
  selector: 'app-manage-charges',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-charges.component.html',
  styleUrls: [
    './manage-charges.component.css',
    '../../../styles/mastermanage-style.css'
  ]
})
export class ManageChargesComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  chargeList: Charge[] = [];
  filteredList: Charge[] = [];
  searchTerm = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showConfirmDelete = false;
  confirmDeleteId: number | null = null;

  constructor(private chargeService: ChargeService, private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCharges();
    }
  }

  loadCharges(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.chargeService.getCharges().subscribe({
      next: (data) => {
        this.chargeList = data;
        this.filteredList = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load charges.';
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredList = term
      ? this.chargeList.filter(c => c.name.toLowerCase().includes(term))
      : [...this.chargeList];
  }

  editCharge(charge: Charge): void {
    sessionStorage.setItem('editCharge', JSON.stringify(charge));
    this.router.navigate(['/master/charge-master']);
  }

  deleteCharge(id: number): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.chargeService.deleteCharge(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Charge deleted successfully!';
          this.loadCharges();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => { this.errorMessage = 'Failed to delete charge.'; }
      });
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.showConfirmDelete = false;
  }
}

