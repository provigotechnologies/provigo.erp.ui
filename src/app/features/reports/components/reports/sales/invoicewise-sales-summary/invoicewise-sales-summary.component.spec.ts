import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicewiseSalesSummaryComponent } from './invoicewise-sales-summary.component';

describe('InvoicewiseSalesSummaryComponent', () => {
  let component: InvoicewiseSalesSummaryComponent;
  let fixture: ComponentFixture<InvoicewiseSalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicewiseSalesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicewiseSalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
