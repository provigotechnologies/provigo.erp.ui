import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import

@Component({
  selector: 'app-manage-discount-scheme',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-discount-scheme.component.html',
  styleUrls: [
    './manage-discount-scheme.component.css',
    '../../../styles/mastermanage-style.css'    ]
})
export class ManageDiscountSchemeComponent {

}
