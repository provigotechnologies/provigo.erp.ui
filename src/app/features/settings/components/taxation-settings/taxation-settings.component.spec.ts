import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationSettingsComponent } from './taxation-settings.component';

describe('TaxationSettingsComponent', () => {
  let component: TaxationSettingsComponent;
  let fixture: ComponentFixture<TaxationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxationSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
