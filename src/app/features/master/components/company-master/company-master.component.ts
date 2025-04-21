import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-company-master',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company-master.component.html',
  styleUrls: [
    './company-master.component.css',
    '../../../styles/product-style.css'   ]
})

export class CompanyMasterComponent {

}
