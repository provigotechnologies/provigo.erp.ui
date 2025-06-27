import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-bill',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purchase-bill.component.html',
  styleUrls: [
    './purchase-bill.component.css',
    '../../../../styles/sales-style.css'
  ]
})
export class PurchaseBillComponent {

  selectedTab: 'bill' | 'serial' = 'bill';
  submitted: boolean = false;
  error = '';

  // Form objects
  purchaseForm = {
    billNo: '', orderNo: '', ewayrNo: '', ipurchaseDate: '', purchaseType: '', supply: '',
    dueDate: '', supplierName: '', orderDate: '', contactNo: '', address: '', custGst: '',
    serialNo: '', itemName: '', unit: '', quantity: '', purchasePrice: '', mrp: '', discount: '',
    tax: '', cess: '', amount: '', netPrice: '', unitPrice: '', amntbeforeTax: '', tag: '',
    totalQuantity: '', employee: '', discountAmount: '', discountPercent: '', reference: '',
    referenceNo: '', shipAmount: '', shipPercent: '', delivery: '', remarks: '', date: '',
    mode: '', txnId: '', payAmount: ''
  };

  serialForm = {
    itemName: '', mrp: '', salePrice: '', minsalePrice: '', serialNo: '', agentPrice: '', wholesalePrice: ''
  };

  // Bind variables from purchaseForm
  get itemName() { return this.purchaseForm.itemName; }
  get quantity() { return this.purchaseForm.quantity; }
  get unit() { return this.purchaseForm.unit; }
  get unitPrice() { return this.purchaseForm.unitPrice; }
  get serialNo() { return this.purchaseForm.serialNo; }
  get mrp() { return this.purchaseForm.mrp; }
  get discount() { return this.purchaseForm.discount; }
  get tax() { return this.purchaseForm.tax; }
  get cess() { return this.purchaseForm.cess; }
  get amount() { return this.purchaseForm.amount; }
  get netPrice() { return this.purchaseForm.netPrice; }
  get amntbeforeTax() { return this.purchaseForm.amntbeforeTax; }

  itemList: {
    serialNo: string;
    itemName: string;
    unit: string;
    quantity: string;
    unitPrice: string;
    mrp: string;
    discount: string;
    tax: string;
    cess: string;
    amount: string;
    netPrice: string;
    amntbeforeTax: string;
  }[] = [];

  serialList: {
    itemName: string;
    mrp: string;
    salePrice: string;
    minsalePrice: string;
    serialNo: string;
    agentPrice: string;
    wholesalePrice: string;
  }[] = [];

  isEditMode = false;
  editingIndex: number | null = null;
  showConfirm = false;

  showConfirmDelete = false;
  confirmDeleteIndex: number | null = null;

  numberOnlyError: {
    minsalePrice: boolean;
    salePrice: boolean;
    amount: boolean;
    mrp: boolean;
    unitPrice: boolean;
    quantity: boolean;
    agentPrice: boolean;
    wholesalePrice: boolean;
  } = {
    minsalePrice: false,
    salePrice: false,
    mrp: false,
    unitPrice: false,
    quantity: false,
    amount: false,
    agentPrice: false,
    wholesalePrice: false
  };

  constructor(private router: Router) {}

  selectTab(tab: 'bill' | 'serial') {
    this.selectedTab = tab;
    this.submitted = false;
  }

  addItem() {
    this.submitted = true;
    this.error = '';

    if (
      !this.itemName.trim() || !/^[a-zA-Z\s]+$/.test(this.itemName) ||
      !this.quantity.trim() || !/^[0-9]+$/.test(this.quantity) ||
      !this.unitPrice.trim() || !/^[0-9]+$/.test(this.unitPrice)
    ) {
      return;
    }

    const newItem = {
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
      amntbeforeTax: this.amntbeforeTax.trim()
    };

    if (this.isEditMode && this.editingIndex !== null) {
      this.itemList[this.editingIndex] = newItem;
    } else {
      this.itemList.push(newItem);
    }

    this.resetForm();
  }

  addSerial() {
    this.submitted = true;
    const { itemName, serialNo, mrp, salePrice, minsalePrice, agentPrice, wholesalePrice } = this.serialForm;

    if (!serialNo || (mrp && !this.isNumeric(mrp)) || (salePrice && !this.isNumeric(salePrice)) || (minsalePrice && !this.isNumeric(minsalePrice))) {
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      this.serialList[this.editingIndex] = { ...this.serialForm };
      this.isEditMode = false;
      this.editingIndex = null;
    } else {
      this.serialList.push({ ...this.serialForm });
    }

    this.resetSerialForm();
    this.submitted = false;
  }

  isNumeric(value: string): boolean {
    return /^\d+(\.\d{1,2})?$/.test(value);
  }

  allowOnlyNumbers(event: KeyboardEvent, field: keyof typeof this.numberOnlyError) {
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

  save() {
    this.submitted = true;
  }

  saveAndNew() {
    this.save();
    if (this.submitted) {
      this.resetAdjustmentForm();
      this.submitted = false;
    }
  }

  saveItems() {
  this.error = '';
  this.showConfirm = false;

  console.log('Item list:', this.itemList);

   if (this.itemList.length === 0) {
    this.error = 'Please add at least one item in purchase bill.';
    this.showConfirm = true;
    return;
  }

  alert('Processing completed successfully.');
}


 saveSerial() {
  this.error = '';
  this.showConfirm = false;

  if (!this.serialForm.itemName || this.serialForm.itemName.trim() === '') {
     this.error = 'You cannot add more item tags!!';
    this.showConfirm = true;
    return;
  }

  // Proceed to save...
  alert('Processing completed successfully.');
}


  resetForm() {
    this.purchaseForm.itemName = '';
    this.purchaseForm.unit = '';
    this.purchaseForm.quantity = '';
    this.purchaseForm.unitPrice = '';
    this.purchaseForm.mrp = '';
    this.purchaseForm.discount = '';
    this.purchaseForm.tax = '';
    this.purchaseForm.cess = '';
    this.purchaseForm.amount = '';
    this.purchaseForm.netPrice = '';
    this.purchaseForm.amntbeforeTax = '';
    this.purchaseForm.serialNo = '';
  }

  resetSerialForm() {
    this.serialForm = {
     itemName: '', mrp: '', salePrice: '', minsalePrice: '', serialNo: '', agentPrice: '', wholesalePrice: ''
    };
  }

  resetAdjustmentForm() {
    this.purchaseForm = {
      billNo: '', orderNo: '', ewayrNo: '', ipurchaseDate: '', purchaseType: '', supply: '',
      dueDate: '', supplierName: '', orderDate: '', contactNo: '', address: '', custGst: '',
      serialNo: '', itemName: '', unit: '', quantity: '', purchasePrice: '', mrp: '', discount: '',
      tax: '', cess: '', amount: '', netPrice: '', unitPrice: '', amntbeforeTax: '', tag: '',
      totalQuantity: '', employee: '', discountAmount: '', discountPercent: '', reference: '',
      referenceNo: '', shipAmount: '', shipPercent: '', delivery: '', remarks: '', date: '',
      mode: '', txnId: '', payAmount: ''
    };
  }

  editTable(index: number) {
    const item = this.serialList[index];
    this.serialForm = {
      itemName: item.itemName,
      mrp: item.mrp,
      salePrice: item.salePrice,
      minsalePrice: item.minsalePrice,
      serialNo: item.serialNo,
      agentPrice: item.agentPrice,
      wholesalePrice: item.wholesalePrice
    };
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
      this.serialList.splice(this.confirmDeleteIndex, 1);
      if (this.editingIndex === this.confirmDeleteIndex) {
        this.resetSerialForm();
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
    this.resetSerialForm();
  }

  navigateToPriceCatalog() {
    this.router.navigate(['/inventory/price-catelog']);
  }
}
