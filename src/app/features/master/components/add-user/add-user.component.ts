import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, RegisterUserDto } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch';
import { Role } from '../../../../core/models/role';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  branches: Branch[] = [];
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private branchService: BranchService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName:    ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      lastName:     ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      email:        ['', [Validators.required, this.emailValidator]],
      password:     ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber:  ['', [Validators.pattern('^[6-9][0-9]{9}$')]],
      roleId:       ['', [Validators.required]],
      userCategory: ['', [Validators.required]],
      branchId:     ['', [Validators.required]],
      isActive:     [true]
    });
  }

  emailValidator(control: any) {
    const value = control.value?.trim();
    if (!value) return null;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|in|org|net|edu)$/;
    if (!regex.test(value) || value.includes('..')) return { invalidEmail: true };
    return null;
  }

  onlyDigits(event: KeyboardEvent): boolean {
    return /[0-9]/.test(event.key);
  }

  trimField(controlName: string): void {
    const ctrl = this.userForm.get(controlName);
    if (ctrl) ctrl.setValue(ctrl.value?.trim() ?? '');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.branchService.getBranches().subscribe({
      next: data => (this.branches = data),
      error: () => (this.errorMessage = 'Failed to load branches.')
    });

    this.authService.getRoles().subscribe({
      next: res => (this.roles = res.data),
      error: () => console.warn('Could not load roles.')
    });
  }

  submit(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) return;

    const fv = this.userForm.value;
    const branchId: string = fv.branchId;

    const dto: RegisterUserDto = {
      email:        fv.email.trim().toLowerCase(),
      password:     fv.password,
      firstName:    fv.firstName.trim(),
      lastName:     fv.lastName.trim(),
      phoneNumber:  fv.phoneNumber?.trim() ?? '',
      roleId:       Number(fv.roleId),
      userCategory: fv.userCategory.trim(),
      isActive:     fv.isActive
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.registerUser(branchId, dto).subscribe({
      next: () => {
        this.successMessage = 'User registered successfully!';
        this.isLoading = false;
        this.userForm.reset({ isActive: true });
        this.submitted = false;
      },
      error: (err) => {
        const msg = typeof err.error === 'string' ? err.error : err.error?.message;
        if (err.status === 400 && msg?.toLowerCase().includes('email')) {
          this.userForm.get('email')?.setErrors({ emailTaken: true });
        } else {
          this.errorMessage = msg || 'Failed to register user. Please try again.';
        }
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/management-tool']);
  }
}