import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

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
    MatDialogModule // ✅ Import this
  ]
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  submitted = false;


constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private dialogRef: MatDialogRef<AddUserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any // ✅ get passed user here
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


onSubmit(): void {
  this.submitted = true;
  this.userForm.markAllAsTouched();

  if (this.userForm.invalid) {
    return;
  }

  const formValue = this.userForm.value;
  const newUser = {
    ...formValue,
    isActive: formValue.isActive === true
  };

  this.authService.register(newUser).subscribe({
    next: () => {
      alert('User created successfully!');
      this.dialogRef.close(true);
    },
    error: (err) => {
      if (err.status === 400 && err.error === 'Email already registered.') {
        this.userForm.get('email')?.setErrors({ emailTaken: true }); // 👈 Set form error
      } else {
        alert('Failed to create user.');
        console.error('Register error:', err);
      }
    }
  });
}


  onCancel(): void {
    this.dialogRef.close(); // ✅ Close without saving
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
