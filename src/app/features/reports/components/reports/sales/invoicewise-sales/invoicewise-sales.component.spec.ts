import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicewiseSalesComponent } from './invoicewise-sales.component';

describe('InvoicewiseSalesComponent', () => {
  let component: InvoicewiseSalesComponent;
  let fixture: ComponentFixture<InvoicewiseSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicewiseSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicewiseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
