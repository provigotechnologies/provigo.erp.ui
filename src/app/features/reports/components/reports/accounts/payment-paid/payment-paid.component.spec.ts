import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaidComponent } from './payment-paid.component';

describe('PaymentPaidComponent', () => {
  let component: PaymentPaidComponent;
  let fixture: ComponentFixture<PaymentPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
