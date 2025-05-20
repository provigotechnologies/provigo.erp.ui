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
    const confirmDelete = window.confirm('Do you want to delete this group?');
    if (!confirmDelete) return;

    this.groupList.splice(index, 1);

    if (this.editingIndex === index) {
      this.resetForm();
    }
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

