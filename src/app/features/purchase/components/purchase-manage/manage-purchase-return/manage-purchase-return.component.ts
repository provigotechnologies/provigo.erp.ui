import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-purchase-return',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-purchase-return.component.html',
  styleUrls: [
    './manage-purchase-return.component.css',
    '../../../../styles/salesmanage-style.css'
  ]
})
export class ManagePurchaseReturnComponent {

}