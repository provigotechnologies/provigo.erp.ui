import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-scheme',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './discount-scheme.component.html',
  styleUrls: [
    './discount-scheme.component.css',
    '../../../styles/discountandstockadjust-style.css'
  ]
})
export class DiscountSchemeComponent {
  selectedTab: 'scheme' | 'mapitem' = 'scheme';

  submitted: boolean = false;
  error = '';

  discountForm = {
    startDate: '',
    endDate: '',
    name: '',
    discountType: '',
    quantity: '',
    freeQuantity: '',
    percent: '',
    custType: '',
    remarks: ''
  };

  mapForm = {
    group: '',
    brand: '',
    location: '',
  };

  isEditMode = false;
  editingIndex: number | null = null;

  showConfirmDelete = false;
  confirmDeleteIndex: number | null = null;

 mapList: {
    group: string;
    brand: string;
    location: string;
  }[] = [];
  constructor(private router: Router) {}

  selectTab(tab: 'scheme' | 'mapitem') {
    this.selectedTab = tab;
    this.submitted = false;
  }

    numberOnlyError: {
    freeQuantity: boolean;
    percent: boolean;
    quantity: boolean;
    } = {
    freeQuantity: false,
    quantity: false,
    percent: false,
  };

 allowOnlyNumbers(event: KeyboardEvent, field: 'freeQuantity' | 'percent' |'quantity') {
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

  isNumeric(value: string): boolean {
    return /^\d+(\.\d{1,2})?$/.test(value);
  }

  save() {
    this.submitted = true;

    const { startDate, endDate, name, discountType, quantity, freeQuantity, custType, percent, remarks } = this.discountForm;

    if (
      !startDate ||
      !endDate ||
      !quantity ||
      !discountType ||
      !name ||
      !freeQuantity ||
      !custType ||
      !percent ||
      !remarks ||
      !this.isNumeric(quantity) ||
      !this.isNumeric(freeQuantity) ||
      !this.isNumeric(percent)
    ) {
      return;
    }

    console.log("Item saved:", this.discountForm);
  }

  saveAndNew() {
    this.save();

    if (this.submitted) {
      this.discountForm = {
        startDate: '',
        endDate: '',
        name: '',
        discountType: '',
        freeQuantity: '',
        quantity: '',
        custType: '',
        percent: '',
        remarks: ''
      };
      this.submitted = false;
    }
  }

  addSerial() {
    this.submitted = true;

    const { group, brand, location } = this.mapForm;

    if (
      !group ||
      !brand  ||
      !location 
    ) {
      return;
    }

    if (this.isEditMode && this.editingIndex !== null) {
      // Update existing serial
      this.mapList[this.editingIndex] = { ...this.mapForm };
      this.isEditMode = false;
      this.editingIndex = null;
    } else {
      // Add new serial
      this.mapList.push({ ...this.mapForm });
    }

    this.resetMapForm();
    this.submitted = false;
  }

  resetMapForm() {
    this.mapForm = {
      group: '',
      brand: '',
      location: '',
    };
  }

    resetDiscountForm() {
    this.discountForm = {
        startDate: '',
        endDate: '',
        name: '',
        discountType: '',
        freeQuantity: '',
        quantity: '',
        custType: '',
        percent: '',
        remarks: ''
    };
  }

    filterAlphabets() {
    // this.accountName = this.accountName.replace(/[^a-zA-Z\s]/g, '');
    // this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
  }

  filterNumbers(field: 'percent' | 'quantity' | 'freeQuantity') {
    // if (field === 'accountNo') {
    //   this.accountNo = this.accountNo.replace(/[^0-9]/g, '');
    // } else if (field === 'openingBalance') {
    //   this.openingBalance = this.openingBalance.replace(/[^0-9]/g, '');
    // }
  }

editTable(index: number) {
  const item = this.mapList[index];

  this.mapForm = {
    group: item.group,
    brand: item.brand,
    location: item.location,
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
      this.mapList.splice(this.confirmDeleteIndex, 1);
      if (this.editingIndex === this.confirmDeleteIndex) {
        this.resetMapForm();
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
    this.resetMapForm();
  }

}
