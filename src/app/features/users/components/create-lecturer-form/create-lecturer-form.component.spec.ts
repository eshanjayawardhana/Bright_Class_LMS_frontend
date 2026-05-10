import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLecturerFormComponent } from './create-lecturer-form.component';

describe('CreateLecturerFormComponent', () => {
  let component: CreateLecturerFormComponent;
  let fixture: ComponentFixture<CreateLecturerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLecturerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLecturerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
