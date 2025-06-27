import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingSettingsComponent } from './printing-settings.component';

describe('PrintingSettingsComponent', () => {
  let component: PrintingSettingsComponent;
  let fixture: ComponentFixture<PrintingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintingSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
