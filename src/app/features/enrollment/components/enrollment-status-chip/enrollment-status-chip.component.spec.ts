import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentStatusChipComponent } from './enrollment-status-chip.component';

describe('EnrollmentStatusChipComponent', () => {
  let component: EnrollmentStatusChipComponent;
  let fixture: ComponentFixture<EnrollmentStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentStatusChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollmentStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
