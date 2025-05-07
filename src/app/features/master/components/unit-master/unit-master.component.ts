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
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.unitList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
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


