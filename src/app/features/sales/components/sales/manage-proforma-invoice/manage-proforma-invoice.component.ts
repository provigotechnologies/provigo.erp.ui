
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-proforma-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule], 
   templateUrl: './manage-proforma-invoice.component.html',
  styleUrls: [
    './manage-proforma-invoice.component.css',
    '../../../../styles/salesmanage-style.css'
  ]})
export class ManageProformaInvoiceComponent {

}
