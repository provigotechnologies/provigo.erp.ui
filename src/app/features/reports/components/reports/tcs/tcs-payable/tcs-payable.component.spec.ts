import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcsPayableComponent } from './tcs-payable.component';

describe('TcsPayableComponent', () => {
  let component: TcsPayableComponent;
  let fixture: ComponentFixture<TcsPayableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TcsPayableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcsPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
