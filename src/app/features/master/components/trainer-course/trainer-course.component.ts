import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/product';
import { ProductService } from '../../../../core/services/product.service';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch';
import { TrainerCourse } from '../../../../core/models/trainer-course';
import { TrainerCourseService } from '../../../../core/services/trainer-course.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-trainer-course',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trainer-course.component.html',
  styleUrls: [
    './trainer-course.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class TrainerCourseComponent implements OnInit {
  products: Product[] = [];
  branches: Branch[] = [];
  trainers: User[] = [];
  trainerCourses: TrainerCourse[] = [];
  selectedProduct: Product | null = null;
  selectedBranch: Branch | null = null;
  selectedTrainer: User | null = null;

  isLoading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private productService: ProductService, 
    private branchService: BranchService, 
    private trainerCourseService: TrainerCourseService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  // Called when branch selection changes
  onBranchChange(): void {
    if (this.selectedBranch) {
      // Reset dependent selections
      this.selectedProduct = null;
      this.selectedTrainer = null;
      this.products = [];
      this.trainers = [];
      
      // Load products for selected branch
      this.loadProducts(this.selectedBranch.branchId);
    } else {
      // Clear everything if no branch selected
      this.products = [];
      this.trainers = [];
      this.selectedProduct = null;
      this.selectedTrainer = null;
    }
  }

  // Called when product selection changes
  onProductChange(): void {
    if (this.selectedProduct && this.selectedBranch) {
      // Reset trainer selection
      this.selectedTrainer = null;
      
      // Load trainers for selected branch
      this.loadTrainers(this.selectedBranch.branchId);
    }
  }

  loadProducts(branchId: string): void {
    console.log('Loading products for branchId:', branchId);
    if (branchId) {
      this.productService.getProducts(branchId).subscribe({
        next: (res) => {
          this.products = res;
          console.log('Products loaded:', this.products);
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.errorMessage = 'Failed to load products.';
        }
      });
    }
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (res) => {
        this.branches = res;
        console.log('Branches loaded:', this.branches);
      },
      error: (err) => {
        console.error('Error loading branches:', err);
        this.errorMessage = 'Failed to load branches.';
      }
    });
  }

  loadTrainers(branchId: string): void {
    if (branchId) {
      this.userService.getUsers(1, 100, false, branchId).subscribe({
        next: (res) => {
          this.trainers = res;
          console.log('Trainers loaded:', this.trainers);
        },
        error: (err) => {
          console.error('Error loading trainers:', err);
          this.errorMessage = 'Failed to load trainers.';
        }
      });
    }
  }

  submit(): void {
    this.submitted = true;

    if (!this.selectedBranch || !this.selectedProduct || !this.selectedTrainer) {
      this.errorMessage = 'Please select Branch, Product and Trainer.';
      return;
    }

    const trainerCourse: TrainerCourse = {
      trainerCourseId: 0,
      tenantId: environment.tenantId,
      branchId: this.selectedBranch.branchId,
      trainerId: this.selectedTrainer.userId,
      ProductId: this.selectedProduct.productId,
      isActive: true
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.trainerCourseService
      .createTrainerCourse(trainerCourse, this.selectedBranch.branchId)
      .subscribe({
        next: () => {
          this.successMessage = 'Trainer mapped to course successfully!';
          this.isLoading = false;
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating trainer course:', err);
          this.errorMessage = 'Failed to map trainer. Please try again.';
          this.isLoading = false;
        }
      });
  }

  resetForm(): void {
    this.selectedBranch = null;
    this.selectedProduct = null;
    this.selectedTrainer = null;
    this.products = [];
    this.trainers = [];
    this.trainerCourses = [];
    this.submitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}