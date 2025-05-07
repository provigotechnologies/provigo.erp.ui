import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-industry',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './industry.component.html',
  styleUrls: [
    './industry.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class IndustryComponent {
  industryName = '';
  error = '';
  industryList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.industryName = this.industryName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.industryName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.industryList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Industry name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.industryList[this.editingIndex] = trimmedName;
    } else {
      this.industryList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.industryName = this.industryList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.industryList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.industryName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}
