import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwisePurchaseSummaryComponent } from './itemwise-purchase-summary.component';

describe('ItemwisePurchaseSummaryComponent', () => {
  let component: ItemwisePurchaseSummaryComponent;
  let fixture: ComponentFixture<ItemwisePurchaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemwisePurchaseSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemwisePurchaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
