import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCatelogComponent } from './price-catelog.component';

describe('PriceCatelogComponent', () => {
  let component: PriceCatelogComponent;
  let fixture: ComponentFixture<PriceCatelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCatelogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCatelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
