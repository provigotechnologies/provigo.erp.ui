import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwiseProfitMarginComponent } from './itemwise-profit-margin.component';

describe('ItemwiseProfitMarginComponent', () => {
  let component: ItemwiseProfitMarginComponent;
  let fixture: ComponentFixture<ItemwiseProfitMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemwiseProfitMarginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemwiseProfitMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
