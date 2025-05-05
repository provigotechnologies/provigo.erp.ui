import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './brand-master.component.html',
  styleUrls: [
    './brand-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class BrandMasterComponent {
  brandName = '';
  error = '';
  brandList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.brandName = this.brandName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.brandName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.brandList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Brand name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.brandList[this.editingIndex] = trimmedName;
    } else {
      this.brandList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.brandName = this.brandList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.brandList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.brandName = '';
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

