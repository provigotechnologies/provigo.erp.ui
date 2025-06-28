import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bank-master.component.html',
  styleUrls: [
    './bank-master.component.css',
    '../../../styles/groupandadjustserialno-style.css'
  ]
})
export class BankMasterComponent {
  accountName = '';
  bankName = '';
  accountNo = '';
  openingBalance = '';
  type: 'Credit' | 'Debit' = 'Credit';

  bankList: {
    accountName: string;
    bankName: string;
    accountNo: string;
    openingBalance: string;
    type: string;
  }[] = [];

  submitted = false;
  error = '';
  showConfirm = false;

  isEditMode = false;
  editingIndex: number | null = null;

  showConfirmDelete = false;
  confirmDeleteIndex: number | null = null;

  numberOnlyError: {
    accountNo: boolean;
    openingBalance: boolean;
  } = {
    accountNo: false,
    openingBalance: false
  };

  addTable() {
  this.submitted = true;
  this.error = '';
  this.showConfirm = false; // Reset initially

  if (!this.accountName || !this.accountNo || !this.bankName) {
    this.error = 'Please fill all required fields.';
    this.showConfirm = true;
    return;
  }

  if (
    !this.accountName.trim() || this.accountName.length < 4 || !/^[a-zA-Z\s]+$/.test(this.accountName) ||
    !this.bankName.trim() || this.bankName.length < 4 || !/^[a-zA-Z\s]+$/.test(this.bankName) ||
    !this.accountNo.trim() || this.accountNo.length < 4 || !/^[0-9]+$/.test(this.accountNo)
  ) {
    this.error = 'Invalid input format.';
    this.showConfirm = true;
    return;
  }

  if (this.type === 'Debit') {
    if (
      !this.openingBalance.trim() ||
      this.openingBalance.length < 1 ||
      !/^[0-9]+$/.test(this.openingBalance)
    ) {
      this.error = 'Opening balance is required for Debit accounts and must be numeric.';
      this.showConfirm = true;
      return;
    }
  }

  const newBank = {
    accountName: this.accountName.trim(),
    bankName: this.bankName.trim(),
    accountNo: this.accountNo.trim(),
    openingBalance: this.openingBalance.trim(),
    type: this.type
  };

  if (this.isEditMode && this.editingIndex !== null) {
    this.bankList[this.editingIndex] = newBank;
  } else {
    this.bankList.push(newBank);
  }

  this.resetForm();
  }


  editTable(index: number) {
  const item = this.bankList[index];
  this.accountName = item.accountName;
  this.bankName = item.bankName;
  this.accountNo = item.accountNo;
  this.openingBalance = item.openingBalance;
  this.type = item.type as 'Credit' | 'Debit';

  this.isEditMode = true;
  this.editingIndex = index;
  this.error = '';
  this.showConfirm = false;
  this.submitted = false;
}

cancel() {
  this.resetForm();
  this.showConfirm = false;
}


  deleteTable(index: number) {
    this.confirmDeleteIndex = index;
    this.showConfirmDelete = true;
  }

confirmDelete() {
  if (this.confirmDeleteIndex !== null) {
    this.bankList.splice(this.confirmDeleteIndex, 1);
    if (this.editingIndex === this.confirmDeleteIndex) {
      this.resetForm();
    }
  }
  this.error = '';
  this.showConfirm = false;    // explicitly clear this
  this.submitted = false;
  this.cancelDelete();
}

cancelDelete() {
  this.confirmDeleteIndex = null;
  this.showConfirmDelete = false;

  this.submitted = false;
  this.error = '';
  this.showConfirm = false;

  if (!this.accountName && !this.bankName && !this.accountNo && !this.openingBalance) {
    this.resetForm();
  }
}


  private resetForm() {
    this.accountName = '';
    this.bankName = '';
    this.accountNo = '';
    this.openingBalance = '';
    this.type = 'Credit';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }

  filterAlphabets() {
    this.accountName = this.accountName.replace(/[^a-zA-Z\s]/g, '');
    this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
  }

  filterNumbers(field: 'accountNo' | 'openingBalance') {
    if (field === 'accountNo') {
      this.accountNo = this.accountNo.replace(/[^0-9]/g, '');
    } else if (field === 'openingBalance') {
      this.openingBalance = this.openingBalance.replace(/[^0-9]/g, '');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent, field: 'accountNo' | 'openingBalance') {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      this.numberOnlyError[field] = true;

      setTimeout(() => {
        this.numberOnlyError[field] = false;
      }, 2000);
    }
  }
  
}
