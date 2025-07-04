import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemwiseSalesComponent } from './itemwise-sales.component';

describe('ItemwiseSalesComponent', () => {
  let component: ItemwiseSalesComponent;
  let fixture: ComponentFixture<ItemwiseSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemwiseSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemwiseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
