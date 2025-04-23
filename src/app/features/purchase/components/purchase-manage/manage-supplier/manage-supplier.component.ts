import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-supplier',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-supplier.component.html',
  styleUrls: [
    './manage-supplier.component.css',
    '../../../../styles/mastermanage-style.css'
      ]
})
export class ManageSupplierComponent {

}
