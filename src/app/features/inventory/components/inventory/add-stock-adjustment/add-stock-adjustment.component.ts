
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-stock-adjustment',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './add-stock-adjustment.component.html',
//   styleUrls: [
//     './add-stock-adjustment.component.css',
//     '../../../../styles/discountandstockadjust-style.css'
//   ]
// })
// export class AddStockAdjustmentComponent {
//   selectedTab: 'item' | 'serial' = 'item';

//   submitted: boolean = false;
//   error = '';

//   adjustmentForm = {
//     adjustmentDate: '',
//     adjustmentType: '',
//     adjustmentReason: '',
//     itemCode: '',
//     productName: '',
//     quantity: '',
//     unitPrice: '',
//     amount: '',
//     remarks: ''
//   };

//   serialForm = {
//     mrp: '',
//     salePrice: '',
//     minsalePrice: '',
//     serialNo: '',
//     agent: '',
//     wholeSale: '',
//   };

//   isEditMode = false;
//   editingIndex: number | null = null;

//   showConfirmDelete = false;
//   confirmDeleteIndex: number | null = null;

//  serialList: {
//     mrp: string;
//     salePrice: string;
//     minsalePrice: string;
//     serialNo: string;
//     agent: string;
//     wholeSale: string;
//   }[] = [];
//   constructor(private router: Router) {}

//   selectTab(tab: 'item' | 'serial') {
//     this.selectedTab = tab;
//     this.submitted = false;
//   }

//     numberOnlyError: {
//     minsalePrice: boolean;
//     salePrice: boolean;
//     amount: boolean;
//     mrp: boolean;
//     unitPrice: boolean;
//     quantity: boolean;
//     } = {
//     minsalePrice: false,
//     salePrice: false,
//     mrp: false,
//     unitPrice: false,
//     quantity: false,
//     amount: false,
//   };

//  allowOnlyNumbers(event: KeyboardEvent, field: 'minsalePrice' | 'salePrice' | 'amount' | 'mrp' |'unitPrice' |'quantity') {
//     const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
//     const isNumber = /^[0-9]$/.test(event.key);

//     if (!isNumber && !allowedKeys.includes(event.key)) {
//       event.preventDefault();
//       this.numberOnlyError[field] = true;

//       setTimeout(() => {
//         this.numberOnlyError[field] = false;
//       }, 2000);
//     }
//   }

//   isNumeric(value: string): boolean {
//     return /^\d+(\.\d{1,2})?$/.test(value);
//   }

//   save() {
//     this.submitted = true;

//     const { productName, adjustmentReason, quantity, unitPrice, amount } = this.adjustmentForm;

//     if (
//       !productName ||
//       !adjustmentReason ||
//       !quantity ||
//       !unitPrice ||
//       !amount ||
//       !this.isNumeric(quantity) ||
//       !this.isNumeric(unitPrice) ||
//       !this.isNumeric(amount)
//     ) {
//       return;
//     }

//     console.log("Item saved:", this.adjustmentForm);
//   }

//   saveAndNew() {
//     this.save();

//     if (this.submitted) {
//       this.adjustmentForm = {
//         adjustmentDate: '',
//         adjustmentType: '',
//         adjustmentReason: '',
//         itemCode: '',
//         productName: '',
//         quantity: '',
//         unitPrice: '',
//         amount: '',
//         remarks: ''
//       };
//       this.submitted = false;
//     }
//   }

//   addSerial() {
//     this.submitted = true;

//     const { serialNo, mrp, salePrice, minsalePrice, agent, wholeSale } = this.serialForm;

//     if (
//       !serialNo ||
//       (mrp && !this.isNumeric(mrp)) ||
//       (salePrice && !this.isNumeric(salePrice)) ||
//       (minsalePrice && !this.isNumeric(minsalePrice))
//     ) {
//       return;
//     }

//     if (this.isEditMode && this.editingIndex !== null) {
//       // Update existing serial
//       this.serialList[this.editingIndex] = { ...this.serialForm };
//       this.isEditMode = false;
//       this.editingIndex = null;
//     } else {
//       // Add new serial
//       this.serialList.push({ ...this.serialForm });
//     }

//     this.resetSerialForm();
//     this.submitted = false;
//   }

//   resetSerialForm() {
//     this.serialForm = {
//       mrp: '',
//       salePrice: '',
//       minsalePrice: '',
//       serialNo: '',
//       agent: '',
//       wholeSale: '',
//     };
//   }

//     resetAdjustmentForm() {
//     this.adjustmentForm = {
//         adjustmentDate: '',
//         adjustmentType: '',
//         adjustmentReason: '',
//         itemCode: '',
//         productName: '',
//         quantity: '',
//         unitPrice: '',
//         amount: '',
//         remarks: '',
//     };
//   }

//     filterAlphabets() {
//     // this.accountName = this.accountName.replace(/[^a-zA-Z\s]/g, '');
//     // this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
//   }

//   filterNumbers(field: 'accountNo' | 'openingBalance' | 'quantity' | 'unitPrice' | 'amount') {
//     // if (field === 'accountNo') {
//     //   this.accountNo = this.accountNo.replace(/[^0-9]/g, '');
//     // } else if (field === 'openingBalance') {
//     //   this.openingBalance = this.openingBalance.replace(/[^0-9]/g, '');
//     // }
//   }

// editTable(index: number) {
//   const item = this.serialList[index];

//   this.serialForm = {
//     mrp: item.mrp,
//     salePrice: item.salePrice,
//     minsalePrice: item.minsalePrice,
//     serialNo: item.serialNo,
//     agent: item.agent,
//     wholeSale: item.wholeSale,
//   };

//   this.isEditMode = true;
//   this.editingIndex = index;
//   this.error = '';
// }


//   deleteTable(index: number) {
//     this.confirmDeleteIndex = index;
//     this.showConfirmDelete = true;
//   }

//   confirmDelete() {
//     if (this.confirmDeleteIndex !== null) {
//       this.serialList.splice(this.confirmDeleteIndex, 1);
//       if (this.editingIndex === this.confirmDeleteIndex) {
//         this.resetSerialForm();
//       }
//     }
//     this.cancelDelete();
//   }

//   cancelDelete() {
//     this.confirmDeleteIndex = null;
//     this.showConfirmDelete = false;
//     this.submitted = false;
//   }

//   cancel() {
//     this.resetSerialForm();
//   }

  
//   navigateToPriceCatalog() {
//     this.router.navigate(['/inventory/price-catelog']);
//   }

// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock-adjustment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-stock-adjustment.component.html',
  styleUrls: ['./add-stock-adjustment.component.css']
})
export class AddStockAdjustmentComponent {

  submitted = false;
  error = '';

  customerForm = {
    customerId: 0,
    tenantId: '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    joinDate: '',
    isActive: true
  };

  constructor(private router: Router) {}

  // ✅ Allow only numbers for phone
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // ✅ Simple Email Validation
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  save() {
    this.submitted = true;

    const { fullName, phone, email } = this.customerForm;

    if (!fullName || !phone) {
      return;
    }

    if (phone.length !== 10) {
      return;
    }

    if (email && !this.isValidEmail(email)) {
      return;
    }

    // 🔥 Set tenant automatically
    this.customerForm.tenantId = localStorage.getItem('tenantId') || '';

    console.log("Customer Saved:", this.customerForm);

    // TODO: Call API here
  }

  saveAndNew() {
    this.save();

    if (this.submitted) {
      this.resetForm();
      this.submitted = false;
    }
  }

  resetForm() {
    this.customerForm = {
      customerId: 0,
      tenantId: '',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      joinDate: '',
      isActive: true
    };
  }

  cancel() {
    this.router.navigate(['/customers']);
  }

}
