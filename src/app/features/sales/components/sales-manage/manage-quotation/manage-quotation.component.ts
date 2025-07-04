
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-quotation',

  standalone: true,
  imports: [FormsModule, CommonModule],
    templateUrl: './manage-quotation.component.html',
    styleUrls: [
      './manage-quotation.component.css',
      '../../../../styles/salesmanage-style.css'
    ]})
export class ManageQuotationComponent {

}
