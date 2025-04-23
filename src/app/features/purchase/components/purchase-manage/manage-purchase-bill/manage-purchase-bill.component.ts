import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-purchase-bill',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-purchase-bill.component.html',
  styleUrls: [
    './manage-purchase-bill.component.css',
    '../../../../styles/salesmanage-style.css'
  ]
})
export class ManagePurchaseBillComponent {

}
