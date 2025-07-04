import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAgingComponent } from './sales-aging.component';

describe('SalesAgingComponent', () => {
  let component: SalesAgingComponent;
  let fixture: ComponentFixture<SalesAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesAgingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
