import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseOfferingService } from '../../core/services/course-offering.service';
import { TrainerCourseService } from '../../core/services/trainer-course.service';
import { ShiftService } from '../../core/services/shift.service';
import { TrainerCourse } from '../../core/models/trainer-course';
import { Shift } from '../../core/models/shift';
import { CourseOfferingCreateDto, TrainerCourseui } from '../../core/models/course-offering.model';
import { BranchService } from '../../core/services/branch.service';
import { Branch, ApiResponse } from '../../core/models/branch';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-course-offering',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-offering.component.html',
  styleUrl: './course-offering.component.css'
})
export class CourseOfferingComponent implements OnInit {

  private environment = environment;

  offeringForm!: FormGroup;

  trainerCourseui: any[] = [];
  //trainerCourse: TrainerCourse[] = [];
  shifts: Shift[] = [];
  branches: Branch[] = [];
  product: Product[] = [];
  loading = false;
  loadingTrainerCourses = false;
  loadingProducts = false;
  loadingShifts = false;

  constructor(
    private fb: FormBuilder,
    private CourseOfferingService: CourseOfferingService,
    private TrainerCourseService: TrainerCourseService,
    private ShiftService: ShiftService,
    private BranchService: BranchService,
    private ProductService: ProductService,
  ) { }

  ngOnInit() {
    this.offeringForm = this.fb.group({
      tenantId: this.environment.tenantId,
      branchId: ['', Validators.required],
      productId: ['', Validators.required], // Fixed: Changed from ProductId to productId (consistent naming)
      trainerCourseId: ['', Validators.required],
      shiftId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      isActive: true
    });

    this.loadBranches();
    this.loadShifts(); // Load shifts on init since they don't depend on branch
  }

  // Load branches only
  loadBranches() {
    this.loading = true;
    this.BranchService.getBranches()
      .subscribe({
        next: (res) => {
          this.branches = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading branches:', err);
          this.loading = false;
        }
      });
  }

  // Load products when branch is selected
  loadProducts(branchId: string) {
    if (!branchId) {
      this.product = [];
      return;
    }

    this.loadingProducts = true;
    this.ProductService.getProducts(branchId)
      .subscribe({
        next: (res) => {
          // Handle different response structures
          this.product = Array.isArray(res) ? res : (res || []);
          this.loadingProducts = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.product = [];
          this.loadingProducts = false;
        }
      });
  }

  // Load trainer courses when product and branch are selected
  loadTrainerCourses(productId: number, branchId: string) {
    if (!productId || !branchId) {
      this.trainerCourseui = [];
      return;
    }

    this.loadingTrainerCourses = true;
    this.TrainerCourseService.getTrainerCourses(productId, branchId)
      .subscribe({
        next: (res) => {
          // Handle response structure
          this.trainerCourseui = res.data || [];
          this.loadingTrainerCourses = false;
          console.log('Loaded trainer courses:', this.trainerCourseui);
        },
        error: (err) => {
          console.error('Error loading trainer courses:', err);
          this.trainerCourseui = [];
          this.loadingTrainerCourses = false;
        }
      });
  }

  // Load shifts (independent of branch)
  loadShifts() {
    this.loadingShifts = true;
    this.ShiftService.getAllShifts()
      .subscribe({
        next: (res) => {
          this.shifts = res.data || [];
          this.loadingShifts = false;
        },
        error: (err) => {
          console.error('Error loading shifts:', err);
          this.shifts = [];
          this.loadingShifts = false;
        }
      });
  }

  // Handle branch change
  onBranchChange() {
    const branchId = this.offeringForm.value.branchId;

    // Reset dependent fields
    this.offeringForm.patchValue({
      productId: '',
      trainerCourseId: ''
    });

    // Clear dependent data
    this.product = [];
    this.trainerCourseui = [];

    if (branchId) {
      this.loadProducts(branchId);
    }
  }

  // Handle product change
  onProductChange() {
    const branchId = this.offeringForm.value.branchId;
    const productId = this.offeringForm.value.productId; // Fixed: Changed from ProductId to productId

    // Reset trainer course
    this.offeringForm.patchValue({
      trainerCourseId: ''
    });

    if (branchId && productId) {
      this.loadTrainerCourses(productId, branchId);
    } else {
      this.trainerCourseui = [];
    }
  }

  // Submit form
  submit() {
    if (this.offeringForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.offeringForm.controls).forEach(key => {
        this.offeringForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Validate time logic
    const startTime = this.offeringForm.value.startTime;
    const endTime = this.offeringForm.value.endTime;

    if (endTime <= startTime) {
      alert('End time must be greater than start time');
      return;
    }

    const branchId = this.offeringForm.value.branchId;

    // Better time formatting - ensures consistent format
    const formatTime = (time: string): string => {
      // If time already includes seconds, return as is
      if (time && time.split(':').length === 3) {
        return time;
      }
      // Add seconds if missing
      return time ? `${time}:00` : time;
    };

    const dto: CourseOfferingCreateDto = {
      trainerCourseId: this.offeringForm.value.trainerCourseId,
      shiftId: this.offeringForm.value.shiftId,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime)
    };

    console.log('Submitting DTO:', dto); // For debugging

    this.loading = true;
    this.CourseOfferingService
      .createCourseOffering(dto, branchId)
      .subscribe({
        next: (res) => {
          if (res.success) {
            alert(res.message);
            this.offeringForm.reset();
            // Reload branches after reset
            this.loadBranches();
            this.loadShifts(); // Also reload shifts
          } else {
            alert(res.message || 'Error creating offering');
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error:', err);

          // Better error message based on error type
          if (err.error && err.error.errors) {
            alert('Validation errors: ' + JSON.stringify(err.error.errors));
          } else if (err.error && err.error.message) {
            alert(err.error.message);
          } else {
            alert('Failed to create course offering. Please try again.');
          }

          this.loading = false;
        }
      });
  }

  // Helper methods for template
  get productControl() { return this.offeringForm.get('productId'); }
  get branchControl() { return this.offeringForm.get('branchId'); }
  get trainerCourseControl() { return this.offeringForm.get('trainerCourseId'); }
  get shiftControl() { return this.offeringForm.get('shiftId'); }
  get startTimeControl() { return this.offeringForm.get('startTime'); }
  get endTimeControl() { return this.offeringForm.get('endTime'); }

  // Time validation
  isTimeValid(): boolean {
    const start = this.offeringForm.value.startTime;
    const end = this.offeringForm.value.endTime;
    return !(start && end && end <= start);
  }
}