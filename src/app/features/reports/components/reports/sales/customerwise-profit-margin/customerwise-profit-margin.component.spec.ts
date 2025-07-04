import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwiseProfitMarginComponent } from './customerwise-profit-margin.component';

describe('CustomerwiseProfitMarginComponent', () => {
  let component: CustomerwiseProfitMarginComponent;
  let fixture: ComponentFixture<CustomerwiseProfitMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerwiseProfitMarginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerwiseProfitMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
