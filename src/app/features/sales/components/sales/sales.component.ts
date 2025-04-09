import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  imports: [],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  activeTab: number = 1;
  todayDate: string = '';

  ngOnInit(): void {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0]; // format: YYYY-MM-DD
  }
}
