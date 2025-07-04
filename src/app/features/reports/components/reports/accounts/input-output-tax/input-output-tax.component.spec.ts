import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputTaxComponent } from './input-output-tax.component';

describe('InputOutputTaxComponent', () => {
  let component: InputOutputTaxComponent;
  let fixture: ComponentFixture<InputOutputTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOutputTaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
