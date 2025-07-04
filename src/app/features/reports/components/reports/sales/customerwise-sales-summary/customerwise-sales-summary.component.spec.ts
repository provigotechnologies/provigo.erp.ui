import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerwiseSalesSummaryComponent } from './customerwise-sales-summary.component';

describe('CustomerwiseSalesSummaryComponent', () => {
  let component: CustomerwiseSalesSummaryComponent;
  let fixture: ComponentFixture<CustomerwiseSalesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerwiseSalesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerwiseSalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
