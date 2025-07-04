import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricManagementComponent } from './biometric-management.component';

describe('BiometricManagementComponent', () => {
  let component: BiometricManagementComponent;
  let fixture: ComponentFixture<BiometricManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiometricManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiometricManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
