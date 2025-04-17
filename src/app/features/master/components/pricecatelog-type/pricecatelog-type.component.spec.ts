import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricecatelogTypeComponent } from './pricecatelog-type.component';

describe('PricecatelogTypeComponent', () => {
  let component: PricecatelogTypeComponent;
  let fixture: ComponentFixture<PricecatelogTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricecatelogTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricecatelogTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
