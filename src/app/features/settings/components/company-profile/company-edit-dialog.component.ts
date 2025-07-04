import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-edit-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company-edit-dialog.component.html',
  styleUrls: [
    './company-edit-dialog.component.css',
    '../../../styles/product-style.css'
  ]
})
export class CompanyEditDialogComponent {
  constructor(private dialogRef: MatDialogRef<CompanyEditDialogComponent>) {}

  onClose() {
    this.dialogRef.close();  // ✅ this will close the dialog
  }
}
