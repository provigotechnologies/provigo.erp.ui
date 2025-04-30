import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcsReceivableComponent } from './tcs-receivable.component';

describe('TcsReceivableComponent', () => {
  let component: TcsReceivableComponent;
  let fixture: ComponentFixture<TcsReceivableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TcsReceivableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcsReceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
