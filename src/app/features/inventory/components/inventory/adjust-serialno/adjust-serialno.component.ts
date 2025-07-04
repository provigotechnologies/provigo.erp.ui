import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-adjust-serialno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adjust-serialno.component.html',
  styleUrls: [
    './adjust-serialno.component.css',
    '../../../../styles/groupandadjustserialno-style.css'
  ]
})
export class AddStockAdjustmentComponent {

}