import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [CommonModule]
})
export class MainComponent {
  bankName = '';
  error = '';
  bankList: string[] = [];
  amount = '';
  description = '';

  selectedTab: 'activity' | 'customer' | 'supplier' | 'received' | 'paid' = 'activity';

  selectTab(tab: 'activity' | 'customer' | 'supplier' | 'received' | 'paid') {
    this.selectedTab = tab;
  }
}
