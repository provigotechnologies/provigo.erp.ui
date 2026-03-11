import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TrainerCourseService } from '../../../../core/services/trainer-course.service';
import { BranchService } from '../../../../core/services/branch.service';
import { ProductService } from '../../../../core/services/product.service';
import { TrainerCourse } from '../../../../core/models/trainer-course';
import { Branch } from '../../../../core/models/branch';
import { Product } from '../../../../core/models/product';
import { User } from '../../../../core/models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-trainer-course',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-trainer-course.component.html',
  styleUrl: './manage-trainer-course.component.css'
})
export class ManageTrainerCourseComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  trainerCourses: any[] = [];
  filteredTrainerCourses: TrainerCourse[] = [];
  
  // Array for trainers extracted from trainerCourses
  trainers: User[] = [];
  
  searchKeyword = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showDeleteConfirm = false;
  deleteTargetId: string | null = null;

  // Filter properties
  selectedBranchId: string | null = null;
  selectedProductId: number | null = null;
  branches: Branch[] = [];
  products: Product[] = [];

  constructor(
    private trainerCourseService: TrainerCourseService,
    private branchService: BranchService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBranches();

      // Load products if branch is already selected (e.g., from session)
      if (this.selectedBranchId) {
        this.loadProducts(this.selectedBranchId);
      }
    }
  }

  loadTrainerCourses(): void {
    if (!this.selectedBranchId || !this.selectedProductId) {
      this.errorMessage = 'Please select both branch and product.';
      this.trainerCourses = [];
      this.filteredTrainerCourses = [];
      this.trainers = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.trainerCourseService.getTrainerCourses(this.selectedProductId, this.selectedBranchId).subscribe({
      next: (res) => {
        console.log('Raw API Response:', res);
        
        // Handle different response structures
        if (Array.isArray(res)) {
          this.trainerCourses = res;
        } else if (res && res.data) {
          this.trainerCourses = res.data;
        } else {
          this.trainerCourses = [];
        }

        console.log('Processed trainer courses:', this.trainerCourses);
        
        // Debug: Log the first item to see its structure
        if (this.trainerCourses.length > 0) {
          console.log('First trainer course structure:', JSON.stringify(this.trainerCourses[0], null, 2));
          console.log('Available properties in first item:', Object.keys(this.trainerCourses[0]));
        }
        
        this.extractTrainers();
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading trainer courses:', err);
        this.errorMessage = 'Failed to load trainer courses.';
        this.isLoading = false;
      }
    });
  }

  extractTrainers(): void {
    console.log('Extracting trainers from courses:', this.trainerCourses);
    
    const trainerMap = new Map();
    
    this.trainerCourses.forEach((tc, index) => {
      console.log(`Processing course ${index}:`, tc);
      
      let trainer = null;
      
      // Case 1: Trainer is a nested object
      if (tc.trainer && typeof tc.trainer === 'object') {
        console.log('Found nested trainer object');
        trainer = tc.trainer;
      } 
      // Case 2: Trainer properties are at root level with various prefixes
      else if (tc.trainer_id || tc.trainerId || tc.trainerFirstName || tc.trainer_firstName) {
        console.log('Found flattened trainer properties');
        trainer = {
          userId: tc.trainer_id || tc.trainerId || tc.id || '',
          firstName: tc.trainer_firstName || tc.trainerFirstName || tc.trainerName || '',
          lastName: tc.trainer_lastName || tc.trainerLastName || '',
          email: tc.trainer_email || tc.trainerEmail || tc.email || '',
          phoneNumber: tc.trainer_phone || tc.trainerPhone || tc.phoneNumber || ''
        };
      }
      // Case 3: Trainer info is in trainerName/trainerEmail fields
      else if (tc.trainerName) {
        console.log('Found trainer name fields');
        trainer = {
          firstName: tc.trainerName,
          lastName: tc.trainerLastName || '',
          email: tc.trainerEmail || tc.email || '',
          phoneNumber: tc.trainerPhone || tc.phoneNumber || ''
        };
      }
      // Case 4: Check if the course itself has user properties
      else if (tc.firstName || tc.lastName || tc.email) {
        console.log('Course has direct user properties');
        trainer = {
          userId: tc.userId || tc.id || '',
          firstName: tc.firstName || '',
          lastName: tc.lastName || '',
          email: tc.email || '',
          phoneNumber: tc.phoneNumber || ''
        };
      }
      
      if (trainer) {
        // Use a unique key to prevent duplicates
        const key = trainer.userId || trainer.email || `trainer-${index}`;
        
        if (!trainerMap.has(key)) {
          trainerMap.set(key, trainer);
          console.log(`Added trainer with key ${key}:`, trainer);
        } else {
          console.log(`Trainer with key ${key} already exists, skipping`);
        }
      } else {
        console.log('No trainer data found in course:', tc);
      }
    });
    
    this.trainers = Array.from(trainerMap.values());
    console.log('Final extracted trainers array:', this.trainers);
    
    // If no trainers were extracted, show a message
    if (this.trainers.length === 0) {
      console.warn('No trainers were extracted from the data');
      this.errorMessage = 'No trainer information found in the course data';
    }
  }

  applyFilter(): void {
    const kw = this.searchKeyword.toLowerCase().trim();
    if (!kw) {
      this.filteredTrainerCourses = [...this.trainerCourses];
    } else {
      this.filteredTrainerCourses = this.trainerCourses.filter(tc => {
        const trainerName = this.getTrainerNameFromCourse(tc).toLowerCase();
        return trainerName.includes(kw);
      });
    }
    
    // Re-extract trainers when filter is applied
    this.extractTrainers();
  }

  getTrainerNameFromCourse(tc: any): string {
    if (tc.trainer?.firstName) {
      return `${tc.trainer.firstName} ${tc.trainer.lastName || ''}`.trim();
    } else if (tc.trainerName) {
      return tc.trainerName;
    } else if (tc.firstName) {
      return `${tc.firstName} ${tc.lastName || ''}`.trim();
    } else if (tc.trainer_firstName) {
      return `${tc.trainer_firstName} ${tc.trainer_lastName || ''}`.trim();
    }
    return '';
  }

  get activeCount(): number {
    return this.trainerCourses.filter(tc => tc.isActive).length;
  }

  get inactiveCount(): number {
    return this.trainerCourses.filter(tc => !tc.isActive).length;
  }

  onBranchChange(): void {
    if (!this.selectedBranchId) {
      this.products = [];
      this.selectedProductId = null;
      this.trainerCourses = [];
      this.filteredTrainerCourses = [];
      this.trainers = [];
      return;
    }

    // Store active branch globally
    this.branchService.setActiveBranchId(this.selectedBranchId);

    // Load products for selected branch
    this.loadProducts(this.selectedBranchId);

    // Reset product selection and trainer courses
    this.selectedProductId = null;
    this.trainerCourses = [];
    this.filteredTrainerCourses = [];
    this.trainers = [];
  }

  onProductChange(): void {
    if (this.selectedBranchId && this.selectedProductId) {
      this.loadTrainerCourses();
    } else {
      this.trainerCourses = [];
      this.filteredTrainerCourses = [];
      this.trainers = [];
    }
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

  loadProducts(branchId: string): void {
    this.productService.getProducts(branchId).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
      }
    });
  }

  getBranchName(branchId: string): string {
    if (!branchId) return '-';
    const branch = this.branches.find(b => b.branchId === branchId);
    return branch ? branch.branchName : '-';
  }

  getProductName(productId: number): string {
    if (!productId) return '-';
    const product = this.products.find(p => p.productId === productId);
    return product ? product.productName : '-';
  }

  getTrainerDisplayName(trainer: any): string {
    if (!trainer) return '-';
    
    // console.log('Getting display name for trainer:', trainer);
    
    // Try different possible property combinations
    if (trainer.firstName || trainer.lastName) {
      return `${trainer.firstName || ''} ${trainer.lastName || ''}`.trim();
    }
    
    if (trainer.trainerName) {
      return trainer.trainerName;
    }
    
    if (trainer.name) {
      return trainer.name;
    }
    
    if (trainer.fullName) {
      return trainer.fullName;
    }
    
    // If we have userId but no name, show ID
    if (trainer.userId) {
      return `Trainer ${trainer.userId}`;
    }
    
    return 'Unknown Trainer';
  }

  addMapping(): void {
    // Navigate to add mapping page with query params for pre-selection
    this.router.navigate(['/trainer-course/add'], {
      queryParams: {
        branchId: this.selectedBranchId,
        productId: this.selectedProductId
      }
    });
  }

  editMapping(id: string): void {
    const mapping = this.trainerCourses.find(tc => tc.trainerCourseId === id);
    this.router.navigate(['/trainer-course/add'], {
      state: { trainerCourse: mapping }
    });
  }

  confirmDelete(id: string): void {
    this.deleteTargetId = id;
    this.showDeleteConfirm = true;
  }

  executeDelete(): void {
    if (this.deleteTargetId !== null) {
      // Add delete method to your service if needed
      // this.trainerCourseService.deleteTrainerCourse(this.deleteTargetId).subscribe({
      //   next: () => {
      //     this.successMessage = 'Trainer course mapping deleted successfully.';
      //     this.loadTrainerCourses();
      //   },
      //   error: () => {
      //     this.errorMessage = 'Failed to delete trainer course mapping.';
      //   }
      // });

      // For now, just remove from local array if no delete API
      this.trainerCourses = this.trainerCourses.filter(tc => tc.trainerCourseId !== this.deleteTargetId);
      this.extractTrainers();
      this.applyFilter();
      this.successMessage = 'Trainer course mapping deleted successfully.';
    }
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deleteTargetId = null;
  }

  clearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000);
  }
}