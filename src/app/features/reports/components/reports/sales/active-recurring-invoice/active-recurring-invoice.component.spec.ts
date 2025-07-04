import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRecurringInvoiceComponent } from './active-recurring-invoice.component';

describe('ActiveRecurringInvoiceComponent', () => {
  let component: ActiveRecurringInvoiceComponent;
  let fixture: ComponentFixture<ActiveRecurringInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveRecurringInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveRecurringInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
