import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSkeletonComponent } from './kpi-skeleton.component';

describe('KpiSkeletonComponent', () => {
  let component: KpiSkeletonComponent;
  let fixture: ComponentFixture<KpiSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpiSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
