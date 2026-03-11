import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../../../core/models/role';
import { UserService, RegisterUserDto } from '../../../../../core/services/user.service';
import { Branch } from '../../../../../core/models/branch';
import { BranchService } from '../../../../../core/services/branch.service';


@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  templateUrl: './add-user-dialog.component.html',
  styleUrls: [
    './add-user-dialog.component.css',
    '../../../../styles/adduser-style.css'
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule // ✅ Import this
  ]
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  branches: Branch[] = []; // ✅ Change this to Branch[]
  roles: Role[] = []; // ✅ Change this to Role[]

  message: string = '';
  showMessage: boolean = false;
  messageClass: string = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private userService: UserService,
  private branchService: BranchService,
  private snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<AddUserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any // ✅ get passed user here
) {
  this.userForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]], // ✅ letters only
  lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],  // ✅ letters only
  email: ['', [Validators.required, Validators.email, gmailOnlyValidator]], 
  password: ['', Validators.required],                                       // ✅ required only
  phoneNumber: ['', [Validators.pattern(/^[0-9]*$/)]],                       // ✅ numbers only
  roleId:       ['', [Validators.required]], // ✅ required only
  branchId:     ['', [Validators.required]], // ✅ required only
  userCategory:  ['', [Validators.required]], // ✅ required only
  isActive: [true, Validators.required]
});

}

allowOnlyLetters(event: KeyboardEvent): void {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
  const isLetter = /^[a-zA-Z ]$/.test(event.key);
  if (!isLetter && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

allowOnlyNumbers(event: KeyboardEvent): void {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
  const isNumber = /^[0-9]$/.test(event.key);
  if (!isNumber && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

// Call this when needed
showAlert(msg: string, type: 'success' | 'error') {
  this.message = msg;
  this.showMessage = true;
  this.messageClass = type === 'success' ? 'snack-success' : 'snack-error';
}

loadRoles() {
  this.authService.getRoles().subscribe({
    next: (res) => {
      this.roles = res.data;
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
  });
}

ngOnInit() {
  this.branchService.getBranches().subscribe(res => this.branches = res); // ✅ Load branches here
  this.loadRoles();
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
      firstName:    fv.firstName,
      lastName:     fv.lastName,
      phoneNumber:  fv.phoneNumber ?? '',
      roleId:       Number(fv.roleId),
      userCategory: fv.userCategory,
      isActive:     fv.isActive,
      
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



onCancel(): void {
  this.dialogRef.close(); // ✅ Now properly defined
}

}


import { AbstractControl, ValidationErrors } from '@angular/forms';

export function gmailOnlyValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && !email.endsWith('@gmail.com')) {
    return { gmailOnly: true };
  }
  return null;
}
