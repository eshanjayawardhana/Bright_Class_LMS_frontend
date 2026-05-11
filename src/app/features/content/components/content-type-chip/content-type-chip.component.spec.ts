import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeChipComponent } from './content-type-chip.component';

describe('ContentTypeChipComponent', () => {
  let component: ContentTypeChipComponent;
  let fixture: ComponentFixture<ContentTypeChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTypeChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentTypeChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
