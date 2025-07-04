import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CompanyEditDialogComponent } from '../company-profile/company-edit-dialog.component';

@Component({
  selector: 'app-company', 
  standalone: true,
  imports: [FormsModule, CommonModule, CompanyEditDialogComponent],
  templateUrl: './company-profile.component.html',
 styleUrls: [
    './company-profile.component.css',
    '../../../../styles/settings-style.css'
  ]
})
export class CompanyProfileComponent {
  company = {
    name: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    email: '',
    phone: '',
    pan: '',
    gstin: '',
    taxMethod: '',
  };

  constructor(private dialog: MatDialog) {}

openEditDialog() {
  const dialogRef = this.dialog.open(CompanyEditDialogComponent, {
    width: '900px',
    maxWidth: '90vw',
    height: '750px',
    maxHeight: '75vh',
    disableClose: true,
    panelClass: 'custom-dialog-radius',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.company = result;
    }
  });
}


}
