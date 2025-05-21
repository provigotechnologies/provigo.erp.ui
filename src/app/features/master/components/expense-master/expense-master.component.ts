import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-master.component.html',
  styleUrls: [
    './expense-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class ExpenseMasterComponent {
  expenseName = '';
  error = '';
  expenseList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  // For custom confirmation alert
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

  filterAlphabets() {
    this.expenseName = this.expenseName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.expenseName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.expenseList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Expense name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.expenseList[this.editingIndex] = trimmedName;
    } else {
      this.expenseList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.expenseName = this.expenseList[index];
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
      this.expenseList.splice(this.confirmDeleteIndex, 1);

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
    this.expenseName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}
