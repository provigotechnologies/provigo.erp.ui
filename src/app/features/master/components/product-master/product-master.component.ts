import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-master.component.html',
  styleUrls: [
    './product-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class ProductMasterComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  productName = '';
  totalFee: number | null = null;
  isActive = true;
  branchId = '';

  submitted = false;
  error = '';
  showConfirm = false;
  isEditMode = false;
  editingId: number | null = null;

  successMessage = '';
  errorMessage = '';

  branches: Branch[] = [];
  
  constructor(private productService: ProductService, private router: Router, private branchService: BranchService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const nav = this.router.getCurrentNavigation();
      const state = nav?.extras?.state as { product?: Product } | undefined;
      if (state?.product) {
        this.loadEditState(state.product);
      } else {
        const stored = sessionStorage.getItem('editProduct');
        if (stored) {
          this.loadEditState(JSON.parse(stored));
          sessionStorage.removeItem('editProduct');
        }
      }

      this.loadBranches();
    }
  }

  private loadEditState(product: Product): void {
    this.productName = product.productName;
    this.totalFee = product.totalFee;
    this.isActive = product.isActive;
    this.branchId = product.branchId;
    this.isEditMode = true;
    this.editingId = product.productId;
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

  addTable(): void {
    this.submitted = true;
    this.error = '';
    this.showConfirm = false;

    if (!this.productName.trim()) {
      this.error = 'Product name is required.';
      this.showConfirm = true;
      return;
    }
    if (this.totalFee === null || this.totalFee === undefined || isNaN(Number(this.totalFee))) {
      this.error = 'Total fee is required.';
      this.showConfirm = true;
      return;
    }

    const payload: Partial<Product> = {
      productName: this.productName.trim(),
      totalFee: Number(this.totalFee),
      isActive: this.isActive,
      branchId: this.branchId
    };

    if (this.isEditMode && this.editingId !== null) {
      this.productService.updateProduct(this.editingId, payload).subscribe({
        next: () => {
          this.successMessage = 'Product updated successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to update product.';
        }
      });
    } else {
      this.productService.addProduct(payload).subscribe({
        next: () => {
          this.successMessage = 'Product added successfully!';
          this.resetForm();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to add product.';
        }
      });
    }
  }

  cancel(): void {
    this.resetForm();
    this.showConfirm = false;
  }

  private resetForm(): void {
    this.productName = '';
    this.totalFee = null;
    this.isActive = true;
    this.branchId = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingId = null;
  }
}
