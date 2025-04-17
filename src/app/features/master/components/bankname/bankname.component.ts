import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-bankname',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './bankname.component.html',
  styleUrls: [
    './bankname.component.css',
    '../style.css' 
  ]
})
export class BankNameComponent {
  bankName = '';
  error = '';
  bankList: string[] = [];

  addTable() {
    if (!this.bankName.trim()) {
      this.error = 'Bank name is required';
      return;
    }

    this.bankList.push(this.bankName.trim());
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
  }

  deleteTable(index: number) {
    this.bankList.splice(index, 1);
  }
}
