import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillwisePurchaseSummaryComponent } from './billwise-purchase-summary.component';

describe('BillwisePurchaseSummaryComponent', () => {
  let component: BillwisePurchaseSummaryComponent;
  let fixture: ComponentFixture<BillwisePurchaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillwisePurchaseSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillwisePurchaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
