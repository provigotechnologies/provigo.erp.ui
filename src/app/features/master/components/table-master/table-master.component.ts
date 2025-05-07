import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table-master.component.html',
  styleUrls: [
    './table-master.component.css',
    '../../../styles/masters-style.css'
  ]
})
export class TableMasterComponent {
  tableName = '';
  error = '';
  tableList: string[] = [];
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;

  filterAlphabets() {
    this.tableName = this.tableName.replace(/[^a-zA-Z\s]/g, '');
  }

  addTable() {
    this.submitted = true;
    const trimmedName = this.tableName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.tableList.some((name, i) =>
      name.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Table name already exists';
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.tableList[this.editingIndex] = trimmedName;
    } else {
      this.tableList.push(trimmedName);
    }

    this.resetForm();
  }

  editTable(index: number) {
    this.tableName = this.tableList[index];
    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    const confirmDelete = window.confirm('Do you want to delete this data?');
    if (!confirmDelete) return;

    this.tableList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.tableName = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}


