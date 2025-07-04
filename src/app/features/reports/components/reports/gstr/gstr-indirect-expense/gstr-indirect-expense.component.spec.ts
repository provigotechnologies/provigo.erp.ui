import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstrIndirectExpenseComponent } from './gstr-indirect-expense.component';

describe('GstrIndirectExpenseComponent', () => {
  let component: GstrIndirectExpenseComponent;
  let fixture: ComponentFixture<GstrIndirectExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstrIndirectExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstrIndirectExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
