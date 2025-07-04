import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../../../../../core/services/auth.service';
import { UserService } from '../../../../../../core/services/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';


@Component({
  selector: 'app-management-tool',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './management-tool.component.html',
  styleUrls: ['./management-tool.component.css']
})
export class ManagementToolComponent {
  selectedTab: string = 'manage';
  showSetPassword: boolean = false;

  users: any[] = [];

  // ✅ Hold checkboxes
  isAdmin: boolean = false;
  isReadOnly: boolean = false;
  isActive: boolean = false;

  // ✅ Private backing field
  private _selectedUser: any = null;

  get selectedUser() {
    return this._selectedUser;
  }

  set selectedUser(user: any) {
    this._selectedUser = user;
    this.updateCheckboxStates(user);
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManagementToolComponent>
  ) {}

  ngOnInit() {
    this.authService.getActiveUsers().subscribe({
      next: (data) => {
        console.log("Users loaded:", data);
        this.users = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  trackByUserId(index: number, user: any): string {
    return user.id;
  }

  onUserChange(user: any) {
  this.selectedUser = user; // will trigger setter & update checkboxes
}

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh user list
        this.ngOnInit();
      }
    });
  }

  openUpdateUserDialog(): void {
  const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
    width: '500px',
    disableClose: true,
    data: { user: this.selectedUser } // ✅ pass selected user
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.ngOnInit(); // ✅ refresh user list if needed
    }
  });
}


updateCheckboxStates(user: any): void {
  if (user) {
    this.isActive = user.status?.toLowerCase() === 'active';
    this.isAdmin = user.role?.toLowerCase() === 'admin';
    this.isReadOnly = user.hasOwnProperty('isReadOnly') ? !!user.isReadOnly : false;
  } else {
    this.isActive = false;
    this.isAdmin = false;
    this.isReadOnly = false;
  }
}

confirmAndDeleteUser(): void {
  if (!this.selectedUser) return;

  const confirmDelete = confirm(`Are you sure you want to delete user "${this.selectedUser.firstName}"?`);

  if (confirmDelete) {
    this.authService.deleteUser(this.selectedUser.id).subscribe({
      next: () => {
        alert('User deleted successfully.');

        // Remove from local users list
        this.users = this.users.filter(user => user.id !== this.selectedUser.id);

        // Reset selected user
        this.selectedUser = null;

        // Reset checkboxes
        this.isAdmin = false;
        this.isReadOnly = false;
        this.isActive = false;
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete user.');
      }
    });
  }
}

}
