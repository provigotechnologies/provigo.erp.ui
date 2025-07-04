import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProformaInvoiceComponent } from './manage-proforma-invoice.component';

describe('ManageProformaInvoiceComponent', () => {
  let component: ManageProformaInvoiceComponent;
  let fixture: ComponentFixture<ManageProformaInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProformaInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProformaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
