import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class AddUserDialogComponent {
  userForm: FormGroup;
  submitted = false;

  roles: any[] = [];

  message: string = '';
  showMessage: boolean = false;
  messageClass: string = '';

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private snackBar: MatSnackBar,
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

// Call this when needed
showAlert(msg: string, type: 'success' | 'error') {
  this.message = msg;
  this.showMessage = true;
  this.messageClass = type === 'success' ? 'snack-success' : 'snack-error';
}

loadRoles() {
  this.authService.getRoles().subscribe({
    next: (data) => {
      this.roles = data;
    },
    error: (err) => {
      console.error('Error fetching roles:', err);
    }
  });
}

ngOnInit() {
  this.loadRoles();
}

onSubmit(): void {
  this.submitted = true;
  this.userForm.markAllAsTouched();

  if (this.userForm.invalid) {
    return;
  }

  const formValue = this.userForm.value;

  const newUser = {
    firstname: formValue.firstname,
    lastname: formValue.lastname,
    phonenumber: formValue.phonenumber,
    email: formValue.email,
    password: formValue.password,
    roleId: formValue.role,           // ✅ Rename here
    isactive: formValue.isActive      // ✅ Match backend naming
  };

  this.authService.register(newUser).subscribe({
    next: (response) => {
      this.showAlert('✅ User created successfully!', 'success');
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2000);
    },
    error: (err) => {
      if (err.status === 400 && err.error === 'Email already registered.') {
        this.userForm.get('email')?.setErrors({ emailTaken: true });
      } else {
        this.showAlert('❌ Failed to user created!', 'error');
        console.error('Register error:', err);
      }
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
