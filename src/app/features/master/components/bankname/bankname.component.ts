import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bankname',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bankname.component.html',
  styleUrls: [
    './bankname.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class BankNameComponent {
  bankName = '';
  error = '';
  bankList: string[] = [];

  // Sanitize input: only letters and spaces
  filterAlphabets() {
    this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    const trimmedName = this.bankName.trim();
  
    if (!trimmedName) {
      this.error = 'Bank name is required';
      return;
    }
  
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      this.error = 'Only letters and spaces allowed';
      return;
    }
  
    const isDuplicate = this.bankList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );
  
    if (isDuplicate) {
      this.error = 'Bank name already exists';
      return;
    }
  
    this.bankList.push(trimmedName);
    this.bankName = '';
    this.error = '';
  }  

  cancel() {
    this.bankName = '';
    this.error = '';
  }

  editTable(index: number) {
    this.bankName = this.bankList[index];
    this.bankList.splice(index, 1);
    this.error = '';
  }

  deleteTable(index: number) {
    this.bankList.splice(index, 1);
  }
}
