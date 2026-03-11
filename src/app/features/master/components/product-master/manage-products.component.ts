import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrls: [
    './manage-products.component.css',
    '../../../styles/mastermanage-style.css'
  ]
})
export class ManageProductsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  productList: Product[] = [];
  filteredList: Product[] = [];
  searchTerm = '';

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  showConfirmDelete = false;
  confirmDeleteId: number | null = null;

  selectedBranchId: string | null = null;
  branches: Branch[] = [];


  constructor(private productService: ProductService, private router: Router, private branchService: BranchService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBranches();

      // load products ONLY if branch already selected
      if (this.selectedBranchId) {
        this.loadProducts();
      }
    }
  }

  loadProducts(Id?: string): void {
    console.log('Loading products for branchId:', Id);

    if (!Id) {
      this.errorMessage = 'Please select a branch.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProducts(Id).subscribe({
      next: (data) => {
        this.productList = data;
        this.filteredList = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredList = term
      ? this.productList.filter(p => p.productName.toLowerCase().includes(term))
      : [...this.productList];
  }

  onBranchChange(): void {
    if (!this.selectedBranchId) {
      this.productList = [];
      this.filteredList = [];
      return;
    }

    // store active branch globally (recommended)
    this.branchService.setActiveBranchId(this.selectedBranchId);

    this.loadProducts(this.selectedBranchId);
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

  editProduct(product: Product): void {
    // sessionStorage.setItem('editProduct', JSON.stringify(product));
    this.router.navigate(['/master/product-master'], { state: { product, branchId: this.selectedBranchId } });
  }

  deleteProduct(id: number): void {
    this.confirmDeleteId = id;
    this.showConfirmDelete = true;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.productService.deleteProduct(this.confirmDeleteId).subscribe({
        next: () => {
          this.successMessage = 'Product deleted successfully!';
          this.loadProducts();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
    this.showConfirmDelete = false;
  }
}

