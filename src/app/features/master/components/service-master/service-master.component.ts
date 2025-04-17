import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-service-master',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './service-master.component.html',
  styleUrl: './service-master.component.css'
})
export class ServiceMasterComponent {

}
