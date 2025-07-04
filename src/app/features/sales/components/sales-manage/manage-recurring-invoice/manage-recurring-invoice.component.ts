
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-recurring-invoice',

  standalone: true,
  imports: [FormsModule, CommonModule], 
   templateUrl: './manage-recurring-invoice.component.html',
  styleUrls: [
    './manage-recurring-invoice.component.css',
    '../../../../styles/salesmanage-style.css'
  ]})
export class ManageRecurringInvoiceComponent {

}

