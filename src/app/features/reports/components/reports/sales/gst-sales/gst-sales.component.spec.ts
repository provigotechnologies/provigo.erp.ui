import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstSalesComponent } from './gst-sales.component';

describe('GstSalesComponent', () => {
  let component: GstSalesComponent;
  let fixture: ComponentFixture<GstSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
