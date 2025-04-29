import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsNotMovingComponent } from './items-not-moving.component';

describe('ItemsNotMovingComponent', () => {
  let component: ItemsNotMovingComponent;
  let fixture: ComponentFixture<ItemsNotMovingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsNotMovingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsNotMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
