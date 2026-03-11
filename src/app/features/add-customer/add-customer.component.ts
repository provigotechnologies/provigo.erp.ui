import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer';
import { BranchService } from '../../core/services/branch.service';
import { Branch } from '../../core/models/branch';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css', '../styles/masters-style.css']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  isEditMode = false;
  editCustomerId: number | null = null;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]+( [A-Za-z]+)*$')
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$')
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          this.emailValidator
        ]
      ],
      address: [''],
      isActive: [true],
      branchId: ['']
    });
  }
  emailValidator(control: any) {
    const value = control.value?.trim();
    if (!value) return null;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|in|org|net|edu)$/;
    if (!regex.test(value) || value.includes('..')) return { invalidEmail: true };
    return null;
  }

  /** Allow only numeric key presses in phone fields */
  onlyDigits(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  /** Trim whitespace from a text field on blur */
  trimField(controlName: string): void {
    const ctrl = this.customerForm.get(controlName);
    if (ctrl) ctrl.setValue(ctrl.value?.trim() ?? '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.isEditMode = true;
      this.editCustomerId = +id;

      // Use customer data passed via navigation state (from manage page)
      const navState = history.state;
      if (navState?.customer) {
        this.patchForm(navState.customer);
      } else {
        // Fallback: fetch full list and find the customer (GET by ID not supported by API)
        this.loadCustomer(this.editCustomerId, navState.branchId);
      }
    }

    this.loadBranches();
  }

  private patchForm(c: Customer): void {
    this.customerForm.patchValue({
      fullName: c.fullName,
      phone: c.phone,
      email: c.email,
      address: c.address,
      isActive: c.isActive,
      branchId: c.branchId
    });
  }

  loadCustomer(id: number, branchId: string): void {
    this.isLoading = true;
    this.customerService.getCustomers(branchId).subscribe({
      next: (customers) => {
        const c = customers.find(x => x.customerId === id);
        if (c) {
          this.patchForm(c);
        } else {
          this.errorMessage = 'Customer not found.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load customer data.';
        this.isLoading = false;
      }
    });
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

  branches: Branch[] = [];

  submit(): void {
    this.submitted = true;
    if (this.customerForm.invalid) return;

    const fv = this.customerForm.value;

    const customer: Customer = {
      customerId: this.editCustomerId ?? 0,
      tenantId: environment.tenantId,
      fullName: fv.fullName.trim(),
      phone: fv.phone.trim(),
      email: fv.email.trim().toLowerCase(),
      address: fv.address?.trim() ?? '',
      joinDate: new Date().toISOString(),
      isActive: fv.isActive,
      branchId: fv.branchId ?? ''
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.isEditMode && this.editCustomerId) {
      this.customerService.updateCustomer(customer).subscribe({
        next: () => {
          this.successMessage = 'Customer updated successfully!';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/customers/manage-customer']), 1200);
        },
        error: () => {
          this.errorMessage = 'Failed to update customer. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.customerService.addCustomer(customer).subscribe({
        next: () => {
          this.successMessage = 'Customer added successfully!';
          this.isLoading = false;
          this.customerForm.reset({ isActive: true });
          this.submitted = false;
        },
        error: () => {
          this.errorMessage = 'Failed to add customer. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/customers/manage-customer']);
  }
}