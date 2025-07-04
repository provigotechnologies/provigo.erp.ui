import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstrSaleComponent } from './gstr-sale.component';

describe('GstrSaleComponent', () => {
  let component: GstrSaleComponent;
  let fixture: ComponentFixture<GstrSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GstrSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstrSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
