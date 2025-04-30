import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwisePurchaseSummaryComponent } from './supplierwise-purchase-summary.component';

describe('SupplierwisePurchaseSummaryComponent', () => {
  let component: SupplierwisePurchaseSummaryComponent;
  let fixture: ComponentFixture<SupplierwisePurchaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierwisePurchaseSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierwisePurchaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
