import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../../../core/models/role';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  templateUrl: './update-user-dialog.component.html',
  styleUrls: [
    './update-user-dialog.component.css',
    '../../../../styles/adduser-style.css'
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule 
  ]
})
export class UpdateUserDialogComponent {
  userForm: FormGroup;
  submitted = false;
  showPassword: boolean = false;

  message: string = '';
  showMessage: boolean = false;
  messageClass: string = '';

  roles: Role[] = [];
 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]], // ✅ letters only
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],  // ✅ letters only
      email: ['', [Validators.required, Validators.email, gmailOnlyValidator]], 
      password: ['', Validators.required],                                       // ✅ required only
      phonenumber: ['', [Validators.pattern(/^[0-9]*$/)]],                       // ✅ numbers only
      role: ['', Validators.required],
      isActive: [true, Validators.required]
    });

    if (data && data.user) {
    this.roles = [{
      id: data.user.roleId,
      roleName: data.user.role
    }];
    this.patchFormWithUser(data.user);
  }
  }

  patchFormWithUser(user: any): void {
    this.userForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.passwordHash, 
      phonenumber: user.phoneNumber,
      role: user.roleId,
      isActive: user.status
    });
  }

  allowOnlyLetters(event: KeyboardEvent): void {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
  const isLetter = /^[a-zA-Z ]$/.test(event.key);
  if (!isLetter && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

  togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

allowOnlyNumbers(event: KeyboardEvent): void {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
  const isNumber = /^[0-9]$/.test(event.key);
  if (!isNumber && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

showAlert(msg: string, type: 'success' | 'error') {
  this.message = msg;
  this.showMessage = true;
  this.messageClass = type === 'success' ? 'snack-success' : 'snack-error';
}

onSubmit(): void {
  if (this.userForm.valid && this.data?.user?.id) {
    const formValue = this.userForm.value;

    const updatedUser: any = {
      firstName: formValue.firstname,
      lastName: formValue.lastname,
      email: formValue.email,
      phoneNumber: formValue.phonenumber,
      isActive: formValue.isActive === true,
      roleId: formValue.role  // ✅ This must be role ID (not name)
    };

    // Include password only if entered
    if (formValue.password && formValue.password.trim() !== '') {
      updatedUser.password = formValue.password;
    }

    this.authService.updateUser(this.data.user.id, updatedUser).subscribe({
      next: () => {
        this.showAlert('✅ User updated successfully!', 'success');
        setTimeout(() => this.dialogRef.close(true), 1500);
      },
      error: (err) => {
        this.showAlert('❌ Failed to update user!', 'error');
        console.error("Update error:", err);
      }
    });
  }
}



loadRoles() {
  this.authService.getRoles().subscribe({
    next: (res) => {
      this.roles = res.data;
    },
    error: (err) => {
      console.error('Failed to load roles', err);

      // ✅ Corrected fallback logic using this.data
      this.roles = this.data?.user?.role
        ? [{ id: this.data.user.roleId, roleName: this.data.user.role }]
        : [];
    }
  });
}



ngOnInit(): void {
  this.loadRoles();
}

  onCancel(): void {
    this.dialogRef.close();
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
