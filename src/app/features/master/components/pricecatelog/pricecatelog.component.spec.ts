import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricecatelogComponent } from './pricecatelog.component';

describe('PricecatelogComponent', () => {
  let component: PricecatelogComponent;
  let fixture: ComponentFixture<PricecatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricecatelogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricecatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
