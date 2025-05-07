import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './department-master.component.html',
  styleUrls: [
    './department-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class DepartmentMasterComponent {
  departmentName = '';
  error = '';
  departmentList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.departmentName = this.departmentName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.departmentName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.departmentList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Department name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.departmentList[this.editingIndex] = trimmedName;
    } else {
      this.departmentList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.departmentName = this.departmentList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.departmentList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.departmentName = '';
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

