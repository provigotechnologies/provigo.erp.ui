import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

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
    MatDialogModule // ✅ Import this
  ]
})
export class UpdateUserDialogComponent {
  userForm: FormGroup;
  submitted = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      this.patchFormWithUser(data.user); // ✅ Prefill form
    }
  }

  patchFormWithUser(user: any): void {
    this.userForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.passwordHash, 
      phonenumber: user.phoneNumber,
      role: user.role,
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


onSubmit(): void {
  if (this.userForm.valid && this.data?.user?.id) {
    const updatedUser = {
      ...this.userForm.value,
      isActive: this.userForm.value.isActive === true
    };

    this.authService.updateUser(this.data.user.id, updatedUser).subscribe({
      next: () => {
        alert("User updated successfully.");
        this.dialogRef.close(true); // triggers refresh in parent
      },
      error: (err) => {
        alert("Failed to update user.");
        console.error("Update error:", err);
      }
    });
  }
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
