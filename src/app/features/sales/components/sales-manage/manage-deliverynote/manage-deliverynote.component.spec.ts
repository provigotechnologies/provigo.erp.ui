import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeliverynoteComponent } from './manage-deliverynote.component';

describe('ManageDeliverynoteComponent', () => {
  let component: ManageDeliverynoteComponent;
  let fixture: ComponentFixture<ManageDeliverynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDeliverynoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDeliverynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
