import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-physical-stock-reconciliation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './physical-stock-reconciliation.component.html',
  styleUrl:  
    './physical-stock-reconciliation.component.css',
  
})
export class PhysicalStockReconciliationComponent {

}



