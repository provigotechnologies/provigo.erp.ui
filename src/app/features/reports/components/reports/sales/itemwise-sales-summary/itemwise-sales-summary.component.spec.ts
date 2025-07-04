import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwiseSalesSummaryComponent } from './itemwise-sales-summary.component';

describe('ItemwiseSalesSummaryComponent', () => {
  let component: ItemwiseSalesSummaryComponent;
  let fixture: ComponentFixture<ItemwiseSalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemwiseSalesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemwiseSalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
