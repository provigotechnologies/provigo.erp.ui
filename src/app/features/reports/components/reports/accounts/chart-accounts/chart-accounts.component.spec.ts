import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAccountsComponent } from './chart-accounts.component';

describe('ChartAccountsComponent', () => {
  let component: ChartAccountsComponent;
  let fixture: ComponentFixture<ChartAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
