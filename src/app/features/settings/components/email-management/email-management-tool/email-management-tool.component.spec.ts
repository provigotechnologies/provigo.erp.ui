import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailManagementToolComponent } from './email-management-tool.component';

describe('EmailManagementToolComponent', () => {
  let component: EmailManagementToolComponent;
  let fixture: ComponentFixture<EmailManagementToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailManagementToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailManagementToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
