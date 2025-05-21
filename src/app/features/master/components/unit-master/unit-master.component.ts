import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './unit-master.component.html',
  styleUrls: [
    './unit-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class UnitMasterComponent {
  unitName = '';
  error = '';
  unitList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  // For custom confirmation alert
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

  filterAlphabets() {
    this.unitName = this.unitName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.unitName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.unitList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Unit name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.unitList[this.editingIndex] = trimmedName;
    } else {
      this.unitList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.unitName = this.unitList[index];
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
      this.unitList.splice(this.confirmDeleteIndex, 1);

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
    this.unitName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}
