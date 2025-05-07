import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './location-master.component.html',
  styleUrls: [
    './location-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class LocationMasterComponent {
  locationName = '';
  error = '';
  locationList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.locationName = this.locationName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.locationName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.locationList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Location name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.locationList[this.editingIndex] = trimmedName;
    } else {
      this.locationList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.locationName = this.locationList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.locationList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.locationName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}


