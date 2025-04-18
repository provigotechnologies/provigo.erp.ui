import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-discount-scheme',
  standalone: true,
  imports: [FormsModule, CommonModule],  // <-- Add CommonModule here
  templateUrl: './discount-scheme.component.html',
  styleUrl: './discount-scheme.component.css'
})
export class DiscountSchemeComponent {

}
