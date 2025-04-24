import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-stock-adjustment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-stock-adjustment.component.html',
  styleUrls: [
    './add-stock-adjustment.component.css',
    '../../../../styles/discountandstockadjust-style.css'
  ]
})
export class AddStockAdjustmentComponent {
  selectedTab: 'item' | 'serial' = 'item';

  serialForm = {
    mrp: null,
    salePrice: null,
    minSalePrice: null,
    serialNo: '',
    agent: '',
    wholesale: '',
  };

  serialList: any[] = [];

  selectTab(tab: 'item' | 'serial') {
    this.selectedTab = tab;
  }

  addSerial() {
    if (this.serialForm.serialNo.trim()) {
      this.serialList.push({ ...this.serialForm });
      this.serialForm = {
        mrp: null,
        salePrice: null,
        minSalePrice: null,
        serialNo: '',
        agent: '',
        wholesale: ''
      };
    }
  }

  constructor(private router: Router) {}

  navigateToPriceCatalog() {
    this.router.navigate(['/inventory/price-catelog']);
  }
}
