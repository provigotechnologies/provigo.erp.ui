import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KotprintersizeComponent } from './kotprintersize.component';

describe('KotprintersizeComponent', () => {
  let component: KotprintersizeComponent;
  let fixture: ComponentFixture<KotprintersizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KotprintersizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KotprintersizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
