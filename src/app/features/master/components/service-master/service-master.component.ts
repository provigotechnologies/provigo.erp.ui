import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-service-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-master.component.html',
  styleUrls: [
    './service-master.component.css',
    '../../../styles/product-style.css'   ]
})

export class ServiceMasterComponent {

}
