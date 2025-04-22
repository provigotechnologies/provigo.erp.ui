import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverynoteComponent } from './deliverynote.component';

describe('DeliverynoteComponent', () => {
  let component: DeliverynoteComponent;
  let fixture: ComponentFixture<DeliverynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverynoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
