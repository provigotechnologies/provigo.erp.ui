import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gstr3Component } from './gstr-3.component';

describe('Gstr3Component', () => {
  let component: Gstr3Component;
  let fixture: ComponentFixture<Gstr3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gstr3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gstr3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
