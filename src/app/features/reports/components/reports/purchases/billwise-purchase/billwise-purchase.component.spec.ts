import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillwisePurchaseComponent } from './billwise-purchase.component';

describe('BillwisePurchaseComponent', () => {
  let component: BillwisePurchaseComponent;
  let fixture: ComponentFixture<BillwisePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillwisePurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillwisePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
