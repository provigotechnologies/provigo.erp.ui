import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BranchService } from '../../core/services/branch.service';
import { Branch } from '../../core/models/branch';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-manage-customers',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-customers.component.html',
  styleUrls: [
    './manage-customers.component.css',
    '../styles/mastermanage-style.css',
    '../styles/masters-style.css'
  ]
})
export class ManageCustomersComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchKeyword = '';
  isLoading = false;
  errorMessage = '';
  showDeleteConfirm = false;
  deleteTargetId: number | null = null;
  selectedBranchId: string | null = null;
  branches: Branch[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private branchService: BranchService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBranches();

      // load customers ONLY if branch already selected
      if (this.selectedBranchId) {
        this.loadCustomers();
      }
    }
  }

  loadCustomers(Id?: string): void {
    console.log('Loading customers for branchId:', Id);

    if (!Id) {
      this.errorMessage = 'Please select a branch.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomers(Id).subscribe({
      next: (res) => {
        this.customers = res;
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers.';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    const kw = this.searchKeyword.toLowerCase().trim();
    if (!kw) {
      this.filteredCustomers = [...this.customers];
    } else {
      this.filteredCustomers = this.customers.filter(c =>
        c.fullName.toLowerCase().includes(kw) ||
        c.phone.includes(kw) ||
        c.email.toLowerCase().includes(kw)
      );
    }
  }

  get activeCount(): number {
    return this.customers.filter(c => c.isActive).length;
  }

  get inactiveCount(): number {
    return this.customers.filter(c => !c.isActive).length;
  }

  addCustomer(): void {
    this.router.navigate(['/customers/add-customer']);
  }

  onBranchChange(): void {
    if (!this.selectedBranchId) {
      this.customers = [];
      this.filteredCustomers = [];
      return;
    }

    // store active branch globally (recommended)
    this.branchService.setActiveBranchId(this.selectedBranchId);

    this.loadCustomers(this.selectedBranchId);
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load branches.';
      }
    });
  }

  getBranchName(branchId: string): string {
    const branch = this.branches.find(b => b.branchId === branchId);
    return branch ? branch.branchName : '-';
  }

  editCustomer(id: number): void {
    const customer = this.customers.find(c => c.customerId === id);
    this.router.navigate(['/customers/add-customer'], {
      queryParams: { id },
      state: { customer }
    });
  }

  confirmDelete(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteConfirm = true;
  }

  executeDelete(): void {
    if (this.deleteTargetId !== null) {
      this.customerService.deleteCustomer(this.deleteTargetId).subscribe({
        next: () => this.loadCustomers()
      });
    }
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }
}