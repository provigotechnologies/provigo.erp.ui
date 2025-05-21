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
  productForm: FormGroup;
  submitted = false; // Track form submission

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      group: ['', Validators.required],
      brand: ['', Validators.required],
      itemCode: [''],
      productName: ['', Validators.required],
      printName: [''],
      purchasePrice: ['', Validators.required],
      salePrice: ['', Validators.required],
      minSalePrice: [''],
      mrp: [''],
      unit: ['', Validators.required],
      openingStock: [''],
      openingStockValue: [''],
      hsnCode: [''],
      cgst: ['', Validators.required],
      sgst: ['', Validators.required],
      igst: ['', Validators.required],
      cess: ['', Validators.required],
      saleDiscount: [''],
      lowLimit: [''],
      productType: [''],
      location: [''],
      serialNo: [''],
      description: [''],
      printSerialNo: [false],
      oneClickSale: [false],
      enableTracking: [false],
      printDescription: [false],
      notForSale: [false],
    });
  }

  onSubmit() {
    this.submitted = true; // Mark form as submitted
    if (this.productForm.valid) {
      console.log('Form submitted:', this.productForm.value);
      // TODO: Save logic here
    } else {
      this.productForm.markAllAsTouched(); // Mark all controls as touched to trigger validation messages
    }
  }
}
