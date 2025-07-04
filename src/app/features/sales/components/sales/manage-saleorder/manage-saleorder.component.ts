
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-saleorder',
  standalone: true,
  imports: [FormsModule, CommonModule], 
    templateUrl: './manage-saleorder.component.html',
    styleUrls: [
      './manage-saleorder.component.css',
      '../../../../styles/salesmanage-style.css'
    ]
  })
export class ManageSaleorderComponent {

}

