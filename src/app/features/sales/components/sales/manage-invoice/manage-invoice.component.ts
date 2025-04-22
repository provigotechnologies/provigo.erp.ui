import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-invoice.component.html',
  styleUrls: [
    './manage-invoice.component.css',
    '../../../../styles/salesmanage-style.css'
  ]
})
export class ManageInvoiceComponent {

}
