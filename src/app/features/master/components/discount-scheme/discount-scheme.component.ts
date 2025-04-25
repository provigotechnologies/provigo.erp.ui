import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  serialForm = {
    mrp: null,
    salePrice: null,
    minSalePrice: null,
    serialNo: '',
    agent: '',
    wholesale: '',
  };

  serialList: any[] = [];

  selectTab(tab: 'scheme' | 'mapitem') {
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

  isAddSchemeModalOpen = false;

  openAddSchemeModal() {
    this.isAddSchemeModalOpen = true;
  }
  
  closeAddSchemeModal() {
    this.isAddSchemeModalOpen = false;
  }
  

}
