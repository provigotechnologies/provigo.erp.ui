import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstrPurchaseComponent } from './gstr-purchase.component';

describe('GstrPurchaseComponent', () => {
  let component: GstrPurchaseComponent;
  let fixture: ComponentFixture<GstrPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstrPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstrPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
