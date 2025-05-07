import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './designation-master.component.html',
  styleUrls: [
    './designation-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class DesignationMasterComponent {
  designationName = '';
  error = '';
  designationList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.designationName = this.designationName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.designationName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.designationList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Designation name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.designationList[this.editingIndex] = trimmedName;
    } else {
      this.designationList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.designationName = this.designationList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.designationList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.designationName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}


