import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstPurchaseComponent } from './gst-purchase.component';

describe('GstPurchaseComponent', () => {
  let component: GstPurchaseComponent;
  let fixture: ComponentFixture<GstPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
