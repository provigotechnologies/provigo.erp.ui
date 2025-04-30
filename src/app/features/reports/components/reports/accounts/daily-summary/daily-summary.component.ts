import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css']
})
export class DailySummaryComponent {
  amountReceived = 300;
  totalNetSales = 300;
  totalExpenses = 0;
  totalPurchases = 0;
  numberOfInvoices = 1;
  numberOfUnpaidInvoices = 0;
  numberOfSaleReturns = 0;
  totalSaleReturns = 0;
  selectedDate: string = new Date().toISOString().split('T')[0];

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.selectedDate = target.value;
    }
  }
  
}
