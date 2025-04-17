import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSettingComponent } from './unit-setting.component';

describe('UnitSettingComponent', () => {
  let component: UnitSettingComponent;
  let fixture: ComponentFixture<UnitSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
