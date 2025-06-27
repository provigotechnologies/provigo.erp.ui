import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule // ✅ Import this
  ]
})
export class UpdateUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // keep optional for update
      phonenumber: [''],
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
      password: '', // left empty
      phonenumber: user.phoneNumber,
      role: user.role,
      isActive: user.isActive
    });
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

