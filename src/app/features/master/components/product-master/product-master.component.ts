import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-master.component.html',
  styleUrls: [
    './product-master.component.css',
    '../../styles/style.css'  
   ]
})

export class ProductMasterComponent {

}
