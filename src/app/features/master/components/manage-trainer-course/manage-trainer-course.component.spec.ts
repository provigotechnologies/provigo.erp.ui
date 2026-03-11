import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainerCourseComponent } from './manage-trainer-course.component';

describe('ManageTrainerCourseComponent', () => {
  let component: ManageTrainerCourseComponent;
  let fixture: ComponentFixture<ManageTrainerCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTrainerCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrainerCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
