import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-creditnote',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './creditnote.component.html',
  styleUrls: [
    './creditnote.component.css',
    '../../../../styles/sales-style.css'
  ]
})
export class CreditnoteComponent  {
  date ='';
  noteType ='';
  supply ='';
  billNo ='';
  supplierName = '';
  contactNo ='';
  serialNo ='';
  itemName = '';
  unit = '';
  quantity = '';
  purchasePrice = '';
  mrp = '';
  discount ='';
  tax ='';
  cess ='';
  amount ='';
  netPrice = '';
  unitPrice = '';
  amntbeforeTax = '';
  remarks = '';
  mode = '';
  txnId = '';
  payAmount = '';

  showConfirm = false;
  isEditMode = false;
  editingIndex: number | null = null;
  confirmDeleteIndex: number | null = null;
  showConfirmDelete = false;

   itemList: {
    serialNo: String;
    itemName: String;
    unit: String;
    quantity: String;
    unitPrice: String;
    mrp: String;
    discount: String;
    tax: String;
    cess: String;
    amount: String;
    netPrice: string;
    amntbeforeTax: string;
  }[] = [];

  submitted = false;
  error = '';

    numberOnlyError: {
    purchasePrice: boolean;
    discount: boolean;
    mrp: boolean;
    quantity: boolean;
    contactNo: boolean;
  } = {
    purchasePrice: false,
    discount: false,
    mrp: false,
    quantity: false,
    contactNo: false,
  };

  addItem() {
    this.submitted = true;
    this.error = '';

    if (
      !this.itemName.trim()    ||  !/^[a-zA-Z\s]+$/.test(this.itemName) ||
      !this.quantity.trim() ||  !/^[0-9]+$/.test(this.quantity) ||
      !this.unitPrice.trim()  ||  !/^[0-9]+$/.test(this.unitPrice)
    ) {
      return;
    }

    const newBank = {
      serialNo: this.serialNo.trim(),
      itemName: this.itemName.trim(),
      unit: this.unit.trim(),
      quantity: this.quantity.trim(),   
      unitPrice: this.unitPrice.trim(),
      mrp: this.mrp.trim(),
      discount: this.discount.trim(),
      tax: this.tax.trim(),   
      cess: this.cess.trim(),
      amount: this.amount.trim(),
      netPrice: this.netPrice.trim(),
      amntbeforeTax: this.amntbeforeTax.trim(),
    };

    if (this.isEditMode && this.editingIndex !== null) {
      this.itemList[this.editingIndex] = newBank;
    } else {
      this.itemList.push(newBank);
    }

    this.resetForm();
  }

 addTable() {
  this.submitted = true;

  // Proceed if valid
  this.itemList.push({
    serialNo: this.serialNo,
    itemName: this.itemName,
    unit: this.unit,
    quantity: this.quantity,
    unitPrice: this.unitPrice,
    mrp: this.mrp,
    discount: this.discount,
    tax: this.tax,
    cess: this.cess,
    amount: this.amount,
    netPrice: this.netPrice,
    amntbeforeTax: this.amntbeforeTax,
  });

  this.resetForm();
}

editTable(index: number) {
    const item = this.itemList[index];
    this.itemName = this.itemName;
    this.unit = this.unit;
    this.quantity = this.quantity;
    this.unitPrice = this.unitPrice;
    this.mrp = this.mrp;
    this.discount = this.discount;
    this.tax = this.tax;
    this.cess = this.cess;
    this.amount = this.amount;

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
      this.itemList.splice(this.confirmDeleteIndex, 1);
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


 filterNumbers(field:  'purchasePrice' | 'discount' | 'mrp' | 'quantity' | 'contactNo' | 'payAmount') {
    if (field === 'purchasePrice') {
      this.purchasePrice = this.purchasePrice.replace(/[^0-9]/g, '');
    } else if (field === 'discount') {
      this.discount = this.discount.replace(/[^0-9]/g, '');
    } else if (field === 'mrp') {
      this.mrp = this.mrp.replace(/[^0-9]/g, '');
    } else if (field === 'quantity') {
      this.quantity = this.quantity.replace(/[^0-9]/g, '');
    }  else if (field === 'contactNo') {
      this.contactNo = this.contactNo.replace(/[^0-9]/g, '');
    }  else if (field === 'payAmount') {
      this.payAmount = this.payAmount.replace(/[^0-9]/g, '');
    } 
  }

  allowOnlyNumbers(event: KeyboardEvent, field:  'purchasePrice' | 'discount' | 'mrp' |'quantity' | 'contactNo' ) {
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

saveItems() {
  this.error = '';
  this.showConfirm = false;

  console.log('Item list:', this.itemList);

   if (this.itemList.length === 0) {
    this.error = 'Please add at least one item in credit note.';
    this.showConfirm = true;
    return;
  }

  alert('Processing completed successfully.');
}


resetForm() {
  this.date ='';
  this.noteType ='';
  this.supply ='';
  this.billNo ='';
  this.supplierName ='';
  this.contactNo ='';
  this.serialNo ='';
  this.itemName = '';
  this.unit = '';
  this.quantity = '';
  this.purchasePrice = '';
  this.mrp = '';
  this.discount ='';
  this.tax ='';
  this.cess ='';
  this.amount ='';
  this.remarks = '';
  this.date = '';
  this.mode = '';
  this.txnId = '';
  this.payAmount = '';
  this.submitted = false;
}

}
