import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossSummaryComponent } from './profit-loss-summary.component';

describe('ProfitLossSummaryComponent', () => {
  let component: ProfitLossSummaryComponent;
  let fixture: ComponentFixture<ProfitLossSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitLossSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
