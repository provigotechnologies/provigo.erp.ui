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
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.bankName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.bankList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Bank name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.bankList[this.editingIndex] = trimmedName;
    } else {
      this.bankList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.bankName = this.bankList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.bankList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.bankName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}

  // deleteTable(index: number) {
  //   const confirmDelete = window.confirm('Do you want to delete this data?');
  //   if (!confirmDelete) return;
  
  //   this.brandList.splice(index, 1);
  
  //   if (this.editingIndex === index) {
  //     this.cancel(); // Reset if the row being edited is deleted
  //   }
  // }

