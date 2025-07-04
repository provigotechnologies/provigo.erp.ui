import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountDueComponent } from './amount-due.component';

describe('AmountDueComponent', () => {
  let component: AmountDueComponent;
  let fixture: ComponentFixture<AmountDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountDueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
