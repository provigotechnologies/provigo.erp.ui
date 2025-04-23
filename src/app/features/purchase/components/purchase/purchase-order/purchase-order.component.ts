import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purchase-order.component.html',
  styleUrls: [
    './purchase-order.component.css',
    '../../../../styles/sales-style.css'
  ]
})
export class PurchaseOrderComponent implements OnInit {
  activeTab: number = 1;
  todayDate: string = '';
  itemList: any[] = [];

  form: FormGroup;
  editIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      itemName: [''],
      tag: [''],
      qty: [''],
      unit: [''],
      unitPrice: [''],
      discount: [''],
      tax: [''],
      cess: [''],
      netPrice: [''],
      amtBeforeTax: ['']
    });
  }

  ngOnInit(): void {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];

    // 3 demo rows
    this.itemList = [
      {
        itemName: 'Coca Cola 500ml', tag: 'Cold Drink', qty: 3, unit: 'Bottle',
        unitPrice: 30, discount: 0, tax: 5, cess: 0, netPrice: 94.5, amtBeforeTax: 90
      },
      {
        itemName: 'Veg Sandwich', tag: 'Snack', qty: 2, unit: 'Plate',
        unitPrice: 50, discount: 10, tax: 5, cess: 0, netPrice: 94.5, amtBeforeTax: 90
      },
      {
        itemName: 'Mineral Water 1L', tag: 'Water', qty: 1, unit: 'Bottle',
        unitPrice: 20, discount: 0, tax: 0, cess: 0, netPrice: 20, amtBeforeTax: 20
      }
    ];
  }

  saveItem() {
    let value = this.form.value;

    const qty = parseFloat(value.qty) || 0;
    const unitPrice = parseFloat(value.unitPrice) || 0;
    const discount = parseFloat(value.discount) || 0;
    const tax = parseFloat(value.tax) || 0;
    const cess = parseFloat(value.cess) || 0;

    const grossAmount = qty * unitPrice;
    const discountAmount = grossAmount * (discount / 100);
    const amtBeforeTax = grossAmount - discountAmount;

    const taxAmount = amtBeforeTax * (tax / 100);
    const cessAmount = amtBeforeTax * (cess / 100);

    const netPrice = amtBeforeTax + taxAmount + cessAmount;

    value.amtBeforeTax = amtBeforeTax.toFixed(2);
    value.netPrice = netPrice.toFixed(2);

    if (this.editIndex === -1) {
      this.itemList.push(value);
    } else {
      this.itemList[this.editIndex] = value;
      this.editIndex = -1;
    }

    this.form.reset();
  }

  editItem(index: number) {
    this.form.patchValue(this.itemList[index]);
    this.editIndex = index;
  }

  removeItem(index: number) {
    this.itemList.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = -1;
      this.form.reset();
    }
  }

  getTotalAmount(): string {
    const total = this.itemList.reduce((sum, item) => sum + parseFloat(item.amtBeforeTax), 0);
    return total.toFixed(2);
  }
}