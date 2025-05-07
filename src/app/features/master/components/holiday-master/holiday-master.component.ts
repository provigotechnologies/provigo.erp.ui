import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './holiday-master.component.html',
  styleUrls: [
    './holiday-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class HolidayMasterComponent {
  holidayName = '';
  error = '';
  holidayList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.holidayName = this.holidayName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.holidayName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.holidayList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Holiday name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.holidayList[this.editingIndex] = trimmedName;
    } else {
      this.holidayList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.holidayName = this.holidayList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.holidayList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.holidayName = '';
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

