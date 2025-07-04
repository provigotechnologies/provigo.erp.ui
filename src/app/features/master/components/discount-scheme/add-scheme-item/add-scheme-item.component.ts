import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-scheme-item',
  templateUrl: './add-scheme-item.component.html',
  styleUrls: ['./add-scheme-item.component.css']
})
export class AddSchemeItemComponent {
  @Input() isVisible: boolean = false;
  @Input() itemList: any[] = [];

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
