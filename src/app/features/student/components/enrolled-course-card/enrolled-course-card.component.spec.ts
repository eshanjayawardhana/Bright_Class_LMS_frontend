import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCourseCardComponent } from './enrolled-course-card.component';

describe('EnrolledCourseCardComponent', () => {
  let component: EnrolledCourseCardComponent;
  let fixture: ComponentFixture<EnrolledCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledCourseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolledCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
