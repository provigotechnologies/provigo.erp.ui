import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-service-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-master.component.html',
  styleUrls: [
    './service-master.component.css',
    '../../../styles/product-style.css'   ]
})

export class ServiceMasterComponent {
  group ='';
  itemCode = '';
  serviceName = '';
  printName = '';
  serviceCharge = '';
  minserviceCharge = '';
  saleDiscount = '';
  hsnCode = '';
  cgst = '';
  sgst = '';
  igst = '';
  cess = '';
  serviceDescription = '';

  showConfirm = false;

   serviceList: {
    group: string;
    itemCode: string;
    serviceName: string; 
    printName: string;
    serviceCharge: string;
    minserviceCharge: string;
    saleDiscount: string;
    hsnCode: string;
    cgst: string;
    sgst: string;
    igst: string;
    cess: string;
    serviceDescription: string;
  }[] = [];

  submitted = false;
  error = '';

    numberOnlyError: {
    serviceCharge: boolean;
    minserviceCharge: boolean;
    saleDiscount: boolean;
  } = {
    serviceCharge: false,
    minserviceCharge: false,
    saleDiscount: false
  };


  addTable() {
  this.submitted = true;

  // Required field check
  if (!this.group || !this.serviceName || !this.serviceCharge || !this.minserviceCharge) {
    this.error = 'Please fill all required fields.';
    this.showConfirm = true; // show alert box
    return;
  }

  // If valid, push to list
  this.serviceList.push({
    group: this.group,
    itemCode: this.itemCode,
    serviceName: this.serviceName,
    printName: this.printName,
    serviceCharge: this.serviceCharge,
    minserviceCharge: this.minserviceCharge,
    saleDiscount: this.saleDiscount,
    hsnCode: this.hsnCode,
    cgst: this.cgst,
    sgst: this.sgst,
    igst: this.igst,
    cess: this.cess,
    serviceDescription: this.serviceDescription
  });

  this.resetForm();
}


 filterNumbers(field: 'serviceCharge' | 'minserviceCharge' | 'saleDiscount') {
    if (field === 'serviceCharge') {
      this.serviceCharge = this.serviceCharge.replace(/[^0-9]/g, '');
    } else if (field === 'minserviceCharge') {
      this.minserviceCharge = this.minserviceCharge.replace(/[^0-9]/g, '');
    } else if (field === 'saleDiscount') {
      this.saleDiscount = this.saleDiscount.replace(/[^0-9]/g, '');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent, field: 'serviceCharge' | 'minserviceCharge' | 'saleDiscount') {
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

 userWarning(index: number) {
    this.showConfirm = true;
  }

resetForm() {
  this.group = '';
  this.itemCode = '';
  this.serviceName = '';
  this.printName = '';
  this.serviceCharge = '';
  this.minserviceCharge = '';
  this.saleDiscount = '';
  this.hsnCode = '';
  this.cgst = '';
  this.sgst = '';
  this.igst = '';
  this.cess = '';
  this.serviceDescription = '';
  this.submitted = false;
}

}
