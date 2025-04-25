import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/purchase/supplier/profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],  // Declare your ProfileComponent here
  imports: [
    CommonModule,  // Make sure CommonModule is imported for directives like ngIf and ngFor to work
  ]
})
export class PurchaseModule {}
