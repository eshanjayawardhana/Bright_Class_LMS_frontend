import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPaymentDialogComponent } from './reject-payment-dialog.component';

describe('RejectPaymentDialogComponent', () => {
  let component: RejectPaymentDialogComponent;
  let fixture: ComponentFixture<RejectPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectPaymentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
