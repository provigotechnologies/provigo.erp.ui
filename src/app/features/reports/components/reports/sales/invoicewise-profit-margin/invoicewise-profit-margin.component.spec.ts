import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicewiseProfitMarginComponent } from './invoicewise-profit-margin.component';

describe('InvoicewiseProfitMarginComponent', () => {
  let component: InvoicewiseProfitMarginComponent;
  let fixture: ComponentFixture<InvoicewiseProfitMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicewiseProfitMarginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicewiseProfitMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
