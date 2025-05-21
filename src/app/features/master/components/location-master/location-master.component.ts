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

  // For custom confirmation alert
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

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
     this.submitted = false;
  }

  deleteTable(index: number) {
    this.confirmDeleteIndex = index;
    this.showConfirmDelete = true;
  }

  confirmDelete() {
    if (this.confirmDeleteIndex !== null) {
      this.locationList.splice(this.confirmDeleteIndex, 1);

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
    this.locationName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}
