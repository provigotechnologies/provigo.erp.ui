import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalStockReconciliationComponent } from './physical-stock-reconciliation.component';

describe('PhysicalStockReconciliationComponent', () => {
  let component: PhysicalStockReconciliationComponent;
  let fixture: ComponentFixture<PhysicalStockReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalStockReconciliationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalStockReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
