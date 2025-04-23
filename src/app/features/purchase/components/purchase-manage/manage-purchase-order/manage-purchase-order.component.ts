import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-purchase-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-purchase-order.component.html',
  styleUrls: [
    './manage-purchase-order.component.css',
    '../../../../styles/salesmanage-style.css'
  ]
})
export class ManagePurchaseOrderComponent {

}