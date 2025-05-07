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
      this.error = 'Designation name already exists';
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
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.expenseList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
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


