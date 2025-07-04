import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringInvoiceComponent } from './recurring-invoice.component';

describe('RecurringInvoiceComponent', () => {
  let component: RecurringInvoiceComponent;
  let fixture: ComponentFixture<RecurringInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
