import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAttendanceComponent } from './search-attendance.component';

describe('SearchAttendanceComponent', () => {
  let component: SearchAttendanceComponent;
  let fixture: ComponentFixture<SearchAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
