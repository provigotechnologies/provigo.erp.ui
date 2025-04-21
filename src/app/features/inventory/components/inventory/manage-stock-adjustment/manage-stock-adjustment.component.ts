import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-stock-adjustment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-stock-adjustment.component.html',
  styleUrls: [
    './manage-stock-adjustment.component.css',
    '../../../../styles/inventorymanage-style.css'
  ]
})
export class ManageStockAdjustmentComponent {

}