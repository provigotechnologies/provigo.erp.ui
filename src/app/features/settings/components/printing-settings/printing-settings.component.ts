import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-printing', 
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './printing-settings.component.html',
 styleUrls: [
    './printing-settings.component.css',
    '../../../styles/settings-style.css'
  ]
})
export class PrintingSettingsComponent {
  activeTab: string = 'general';

  selectTab(tab: string): void {
  this.activeTab = tab;
}

startA4Configuration() {
  // Logic to start A4/A5 config
  console.log("A4/A5 document config started");
}

startPosConfiguration() {
  // Logic to start PoS config
  console.log("PoS/Thermal document config started");
}


}
