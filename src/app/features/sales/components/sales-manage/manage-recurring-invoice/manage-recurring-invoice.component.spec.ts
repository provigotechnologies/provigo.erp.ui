import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecurringInvoiceComponent } from './manage-recurring-invoice.component';

describe('ManageRecurringInvoiceComponent', () => {
  let component: ManageRecurringInvoiceComponent;
  let fixture: ComponentFixture<ManageRecurringInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRecurringInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecurringInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
