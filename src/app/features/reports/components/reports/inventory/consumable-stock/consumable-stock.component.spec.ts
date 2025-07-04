import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumableStockComponent } from './consumable-stock.component';

describe('ConsumableStockComponent', () => {
  let component: ConsumableStockComponent;
  let fixture: ComponentFixture<ConsumableStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumableStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumableStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
