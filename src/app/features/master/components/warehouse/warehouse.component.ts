import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './warehouse.component.html',
  styleUrls: [
    './warehouse.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class WarehouseComponent {
  warehouseName = '';
  location = '';
  error = '';
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

  warehouseList: { name: string; location: string }[] = [];

  addTable() {
    this.submitted = true;

    const name = this.warehouseName.trim();
    const loc = this.location.trim();

    const nameValid = /^[a-zA-Z\s]{3,}$/.test(name);
    const locValid = /^[a-zA-Z\s]{2,}$/.test(loc);

    if (!nameValid || !locValid) {
      return; // form will display validation errors
    }

    const duplicate = this.warehouseList.some(
      entry =>
        entry.name.toLowerCase() === name.toLowerCase() &&
        entry.location.toLowerCase() === loc.toLowerCase()
    );

    if (duplicate) {
      this.error = 'Warehouse with this name and location already exists';
      return;
    }

    this.warehouseList.push({ name, location: loc });
    this.cancel(); // clear form
  }

  cancel() {
    this.warehouseName = '';
    this.location = '';
    this.error = '';
    this.submitted = false;
  }

  editTable(index: number) {
    const item = this.warehouseList[index];
    this.warehouseName = item.name;
    this.location = item.location;
    this.warehouseList.splice(index, 1);
    this.error = '';
    this.submitted = false;
  }

  
  deleteTable(index: number) {
    this.confirmDeleteIndex = index;
    this.showConfirmDelete = true;
  }

  confirmDelete() {
    if (this.confirmDeleteIndex !== null) {
      this.warehouseList.splice(this.confirmDeleteIndex, 1);

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

    private resetForm() {
    this.warehouseName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }

}
