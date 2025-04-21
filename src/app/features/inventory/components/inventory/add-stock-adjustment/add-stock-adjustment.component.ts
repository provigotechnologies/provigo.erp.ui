import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-add-stock-adjustment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-stock-adjustment.component.html',
  styleUrls: [
    './add-stock-adjustment.component.css',
    '../../../../styles/discountandstockadjust-style.css'
  ]
})
export class AddStockAdjustmentComponent {

}