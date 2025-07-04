import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIndirectExpenseComponent } from './search-indirect-expense.component';

describe('SearchIndirectExpenseComponent', () => {
  let component: SearchIndirectExpenseComponent;
  let fixture: ComponentFixture<SearchIndirectExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchIndirectExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIndirectExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
