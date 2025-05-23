import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-physical-stock-reconciliation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './physical-stock-reconciliation.component.html',
  styleUrl:  
    './physical-stock-reconciliation.component.css',
  
})
export class PhysicalStockReconciliationComponent {
  itemName = '';
  availableStock = '';
  physicalStock = '';
  changeStock = '';
  finalStock = '';

  stockList: {
    itemName: string;
    availableStock: string;
    physicalStock: string;  
    changeStock: string;
    finalStock: string;
  }[] = [];

  submitted = false;
  error = '';

  showConfirm = false;

  isEditMode = false;
  editingIndex: number | null = null;

  showConfirmDelete = false;
  confirmDeleteIndex: number | null = null;

  numberOnlyError: {
    physicalStock: boolean;
  } = {
    physicalStock: false,
  };

processItems() {
  this.error = '';
  this.showConfirm = false;

  console.log('Stock list:', this.stockList);

  if (this.stockList.length === 0) {
    this.error = 'Please add at least one stock item before processing.';
    this.showConfirm = true;
    return;
  }

  const hasInvalidItem = this.stockList.some(item =>
    !item.itemName.trim() ||
    !item.availableStock.trim() ||
    !item.physicalStock.trim() ||
    !/^[a-zA-Z\s]+$/.test(item.itemName) ||
    !/^\d+$/.test(item.availableStock) ||
    !/^\d+$/.test(item.physicalStock)
  );

  if (hasInvalidItem) {
    this.error = 'Please fill all required fields correctly in each item.';
    this.showConfirm = true;
    return;
  }

  alert('Processing completed successfully.');
}



  addStock() {
    this.submitted = true;
    this.error = '';

    if (
      !this.itemName.trim()    ||  !/^[a-zA-Z\s]+$/.test(this.itemName) ||
      !this.availableStock.trim() ||  !/^[a-zA-Z\s]+$/.test(this.availableStock) ||
      !this.physicalStock.trim()  ||  !/^[0-9]+$/.test(this.physicalStock)
    ) {
      return;
    }

    const newBank = {
      itemName: this.itemName.trim(),
      availableStock: this.availableStock.trim(),
      physicalStock: this.physicalStock.trim(),   
      changeStock: this.changeStock.trim(),
      finalStock: this.finalStock.trim(),
    };

    if (this.isEditMode && this.editingIndex !== null) {
      this.stockList[this.editingIndex] = newBank;
    } else {
      this.stockList.push(newBank);
    }

    this.resetForm();
  }

  editTable(index: number) {
    const item = this.stockList[index];
    this.itemName = item.itemName;
    this.availableStock = item.availableStock;
    this.physicalStock = item.physicalStock;

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
      this.stockList.splice(this.confirmDeleteIndex, 1);
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
    this.itemName = '';
    this.availableStock = '';
    this.physicalStock = '';
    this.error = '';
    this.submitted = false;
    this.isEditMode = false;
    this.editingIndex = null;
  }

  // filterAlphabets() {
  //   this.accountName = this.accountName.replace(/[^a-zA-Z\s]/g, '');
  //   this.bankName = this.bankName.replace(/[^a-zA-Z\s]/g, '');
  // }

  filterNumbers(field: 'physicalStock' | 'availableStock') {
     if (field === 'physicalStock') {
      this.physicalStock = this.physicalStock.replace(/[^0-9]/g, '');
    } else if (field === 'availableStock') {
      this.availableStock = this.availableStock.replace(/[^0-9]/g, '');
    }
  }

  allowOnlyNumbers(event: KeyboardEvent, field: 'physicalStock') {
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
