import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSerialsComponent } from './available-serials.component';

describe('AvailableSerialsComponent', () => {
  let component: AvailableSerialsComponent;
  let fixture: ComponentFixture<AvailableSerialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableSerialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableSerialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
