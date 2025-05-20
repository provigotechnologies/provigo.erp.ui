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

  // For custom confirmation alert
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

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
     this.submitted = false;
  }

  deleteTable(index: number) {
    this.confirmDeleteIndex = index;
    this.showConfirmDelete = true;
  }

  confirmDelete() {
    if (this.confirmDeleteIndex !== null) {
      this.bankList.splice(this.confirmDeleteIndex, 1);

      if (this.editingIndex === this.confirmDeleteIndex) {
        this.resetForm();
      }
    }
    this.cancelDelete();
  }

  cancelDelete() {
    this.confirmDeleteIndex = null;
    this.showConfirmDelete = false;
    this.submitted = false;
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
