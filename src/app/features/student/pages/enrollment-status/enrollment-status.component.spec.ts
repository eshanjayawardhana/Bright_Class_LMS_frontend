import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentStatusComponent } from './enrollment-status.component';

describe('EnrollmentStatusComponent', () => {
  let component: EnrollmentStatusComponent;
  let fixture: ComponentFixture<EnrollmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
