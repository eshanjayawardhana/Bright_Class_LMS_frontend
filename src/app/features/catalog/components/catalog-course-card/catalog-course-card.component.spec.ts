import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCourseCardComponent } from './catalog-course-card.component';

describe('CatalogCourseCardComponent', () => {
  let component: CatalogCourseCardComponent;
  let fixture: ComponentFixture<CatalogCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCourseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
