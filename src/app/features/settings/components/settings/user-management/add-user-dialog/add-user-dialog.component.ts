import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule // ✅ Import this
  ]
})
export class AddUserDialogComponent {
  userForm: FormGroup;

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private dialogRef: MatDialogRef<AddUserDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any // ✅ get passed user here
) {
  this.userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phonenumber: [''],
    role: ['', Validators.required],
    isActive: [true, Validators.required]
  });
}


onSubmit(): void {
  if (this.userForm.valid) {
    const formValue = this.userForm.value;

    const newUser = {
      ...formValue,
      isActive: formValue.isActive === true // ✅ FIX: send as boolean
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        alert('User created successfully!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        alert('Failed to create user.');
        console.error('Register error:', err); // ✅ See exact backend error
      }
    });
  }
}

  onCancel(): void {
    this.dialogRef.close(); // ✅ Close without saving
  }
}
