import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseAgingComponent } from './purchase-aging.component';

describe('PurchaseAgingComponent', () => {
  let component: PurchaseAgingComponent;
  let fixture: ComponentFixture<PurchaseAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseAgingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
