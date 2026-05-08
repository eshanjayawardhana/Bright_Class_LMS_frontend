import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusChipComponent } from './payment-status-chip.component';

describe('PaymentStatusChipComponent', () => {
  let component: PaymentStatusChipComponent;
  let fixture: ComponentFixture<PaymentStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
