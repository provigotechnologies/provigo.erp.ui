import { Component, OnInit } from '@angular/core';  // Import OnInit here
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-itemwise-purchase',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './itemwise-purchase.component.html',
  styleUrls: [
    './itemwise-purchase.component.css',
    '../../../../../styles/report-style.css'
  ]
})
export class ItemwisePurchaseComponent implements OnInit {  // Implement OnInit here
  fromDate: string = '';
  toDate: string = '';
  activeTab: string = 'all';
  transactions: any[] = [];
  categorySummary: any[] = [];
  totalCredit: number = 0;
  totalDebit: number = 0;

  setToday() {
    const today = new Date().toISOString().split('T')[0];
    this.fromDate = this.toDate = today;
  }

  setYesterday() {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    this.fromDate = this.toDate = yesterday;
  }

  setDays(days: number) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - (days - 1));
    this.fromDate = from.toISOString().split('T')[0];
    this.toDate = to.toISOString().split('T')[0];
  }

  search() {
    // implement search logic
  }

  reset() {
    this.fromDate = '';
    this.toDate = '';
    this.transactions = [];
    this.categorySummary = [];
  }

  cashInflow: number = 0;
  cashOutflow: number = 0;
  netCash: number = 0;

  constructor() {}

  ngOnInit(): void {
    // You can fetch and calculate the actual values here
    this.cashInflow = 5000;  // Example value
    this.cashOutflow = 2000; // Example value
    this.netCash = this.cashInflow - this.cashOutflow;
  }
}
