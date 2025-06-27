import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-salereturn',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-salereturn.component.html',
  styleUrls: [
    './manage-salereturn.component.css',
    '../../../../styles/salesmanage-style.css'
  ]
})
export class ManageSaleReturnComponent {

}