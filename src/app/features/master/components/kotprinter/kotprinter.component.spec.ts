import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotprinterComponent } from './kotprinter.component';

describe('KotprinterComponent', () => {
  let component: KotprinterComponent;
  let fixture: ComponentFixture<KotprinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KotprinterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotprinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
