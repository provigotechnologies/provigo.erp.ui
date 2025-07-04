import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustSerialnoComponent } from './adjust-serialno.component';

describe('AdjustSerialnoComponent', () => {
  let component: AdjustSerialnoComponent;
  let fixture: ComponentFixture<AdjustSerialnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustSerialnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustSerialnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
