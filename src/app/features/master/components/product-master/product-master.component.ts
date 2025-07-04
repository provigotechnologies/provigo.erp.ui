import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-master.component.html',
  styleUrls: [
    './product-master.component.css',
    '../../../styles/product-style.css'
  ]
})
export class ProductMasterComponent {
  group ='';
  brand ='';
  itemCode ='';
  productName ='';
  printName ='';
  purchasePrice ='';
  salePrice ='';
  mrp ='';
  unit ='';
  openingStock ='';
  stockValue ='';
  hsnCode = '';
  cgst = '';
  sgst = '';
  igst = '';
  cess = '';
  saleDiscount ='';
  lowLevelLimit ='';
  productType ='';
  location ='';
  serialNo ='';
  productDescription = '';

    showConfirm = false;

   productList: {
    group: string;
    brand: string;
    itemCode: string;
    productName: string; 
    printName: string;
    purchasePrice: string;
    salePrice: string;
    mrp: string;
    unit: string;
    openingStock: string;
    stockValue: string;
    hsnCode: string;
    cgst: string;
    sgst: string;
    igst: string;
    cess: string;
    saleDiscount: string;
    lowLevelLimit: string;
    productType: string;
    location: string;
    serialNo: string;
    productDescription: string;
  }[] = [];

  submitted = false;
  error = '';

    numberOnlyError: {
    purchasePrice: boolean;
    salePrice: boolean;
    saleDiscount: boolean;
    mrp: boolean;
    openingStock: boolean;
    stockValue: boolean;
    lowLevelLimit: boolean;
  } = {
    purchasePrice: false,
    salePrice: false,
    saleDiscount: false,
    mrp: false,
    stockValue: false,
    openingStock: false,
    lowLevelLimit: false
  };


 addTable() {
  this.submitted = true;

  if (!this.group || !this.productName || !this.purchasePrice || !this.salePrice) {
    this.error = 'Please fill all required fields.';
    this.showConfirm = true; // Show alert
    return;
  }

  // Proceed if valid
  this.productList.push({
    group: this.group,
    brand: this.brand,
    itemCode: this.itemCode,
    productName: this.productName,
    printName: this.printName,
    purchasePrice: this.purchasePrice,
    salePrice: this.salePrice,
    mrp: this.mrp,
    unit: this.unit,
    openingStock: this.openingStock,
    stockValue: this.stockValue,
    hsnCode: this.hsnCode,
    cgst: this.cgst,
    sgst: this.sgst,
    igst: this.igst,
    cess: this.cess,
    saleDiscount: this.saleDiscount,
    lowLevelLimit: this.lowLevelLimit,
    productType: this.productType,
    location: this.location,
    serialNo: this.serialNo,
    productDescription: this.productDescription
  });

  this.resetForm();
}


 filterNumbers(field: 'purchasePrice' | 'salePrice' | 'saleDiscount' | 'mrp' |'openingStock' |'stockValue' | 'lowLevelLimit') {
    if (field === 'purchasePrice') {
      this.purchasePrice = this.purchasePrice.replace(/[^0-9]/g, '');
    } else if (field === 'salePrice') {
      this.salePrice = this.salePrice.replace(/[^0-9]/g, '');
    } else if (field === 'saleDiscount') {
      this.saleDiscount = this.saleDiscount.replace(/[^0-9]/g, '');
    } else if (field === 'mrp') {
      this.mrp = this.mrp.replace(/[^0-9]/g, '');
    }  else if (field === 'openingStock') {
      this.openingStock = this.openingStock.replace(/[^0-9]/g, '');
    }  else if (field === 'stockValue') {
      this.stockValue = this.stockValue.replace(/[^0-9]/g, '');
    } 
  }

  allowOnlyNumbers(event: KeyboardEvent, field: 'purchasePrice' | 'salePrice' | 'saleDiscount' | 'mrp' |'openingStock' |'stockValue' | 'lowLevelLimit') {
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

resetForm() {
  this.group = '';
  this.itemCode = '';
  this.productName = '';
  this.printName = '';
  this.purchasePrice = '';
  this.salePrice = '';
  this.saleDiscount = '';
  this.hsnCode = '';
  this.cgst = '';
  this.sgst = '';
  this.igst = '';
  this.cess = '';
  this.productDescription = '';
  this.submitted = false;
}

}
