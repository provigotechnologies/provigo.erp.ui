import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCourseComponent } from './trainer-course.component';

describe('TrainerCourseComponent', () => {
  let component: TrainerCourseComponent;
  let fixture: ComponentFixture<TrainerCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
