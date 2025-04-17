import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintparamComponent } from './printparam.component';

describe('PrintparamComponent', () => {
  let component: PrintparamComponent;
  let fixture: ComponentFixture<PrintparamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintparamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
