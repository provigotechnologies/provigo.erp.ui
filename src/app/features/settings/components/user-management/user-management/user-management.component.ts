import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagementToolComponent } from '../management-tool/management-tool.component';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatDialogModule,],
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.css',
    '../../../../styles/settings-style.css'
  ]
})
export class UserManagementComponent {

  constructor(private dialog: MatDialog) {}  // ✅ use MatDialog here only

  openManagementDialog(): void {
    const dialogRef = this.dialog.open(ManagementToolComponent, {
      width: '1000px',
      maxWidth: '90vw',
      height: '700px',
      maxHeight: '70vh',
      disableClose: true,
      panelClass: 'custom-dialog-radius',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }

}
