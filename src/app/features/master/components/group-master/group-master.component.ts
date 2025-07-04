import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './group-master.component.html',
  styleUrls: [
    './group-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class GroupMasterComponent {
  groupName = '';
  hsnCode = '';
  cgst = '';
  sgst = '';
  igst = '';
  cess = '';

  error = '';
  submitted = false;

  isEditMode = false;
  editingIndex: number | null = null;
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

  groupList: {
    groupName: string;
    hsnCode: string;
    cgst: string;
    sgst: string;
    igst: string;
    cess: string;
  }[] = [];

  filterAlphabets() {
    this.groupName = this.groupName.replace(/[^a-zA-Z\s]/g, '');
  }

allowOnlyNumbersWithDecimal(event: KeyboardEvent) {
  const inputChar = event.key;
  const currentValue = (event.target as HTMLInputElement).value;

  // Allow digits
  if (/^[0-9]$/.test(inputChar)) {
    return;
  }

  // Allow only one decimal point
  if (inputChar === '.' && !currentValue.includes('.')) {
    return;
  }

  // Block everything else
  event.preventDefault();
}

filterDecimal(field: 'cgst' | 'sgst' | 'igst' | 'cess') {
  let value = this[field];

  // Remove letters and special characters, allow only digits and one dot
  value = value.replace(/[^0-9.]/g, '');

  // Ensure only one dot is allowed
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }

  this[field] = value;
}


  addTable() {
    this.submitted = true;
    const trimmedName = this.groupName.trim();

    if (!trimmedName || trimmedName.length < 4 || !/^[a-zA-Z\s]+$/.test(trimmedName)) return;

    const isDuplicate = this.groupList.some((item, i) =>
      item.groupName.toLowerCase() === trimmedName.toLowerCase() && i !== this.editingIndex
    );

    if (isDuplicate) {
      this.error = 'Group name already exists';
      return;
    }

    const newGroup = {
      groupName: trimmedName,
      hsnCode: this.hsnCode,
      cgst: this.cgst,
      sgst: this.sgst,
      igst: this.igst,
      cess: this.cess
    };

    if (this.isEditMode && this.editingIndex !== null) {
      this.groupList[this.editingIndex] = newGroup;
    } else {
      this.groupList.push(newGroup);
    }

    this.resetForm();
  }

  editTable(index: number) {
    const item = this.groupList[index];
    this.groupName = item.groupName;
    this.hsnCode = item.hsnCode;
    this.cgst = item.cgst;
    this.sgst = item.sgst;
    this.igst = item.igst;
    this.cess = item.cess;

    this.isEditMode = true;
    this.editingIndex = index;
    this.error = '';
  }

  deleteTable(index: number) {
    this.confirmDeleteIndex = index;
    this.showConfirmDelete = true;
  }

  confirmDelete() {
    if (this.confirmDeleteIndex !== null) {
      this.groupList.splice(this.confirmDeleteIndex, 1);
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
    this.groupName = '';
    this.hsnCode = '';
    this.cgst = '';
    this.sgst = '';
    this.igst = '';
    this.cess = '';

    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }
}
