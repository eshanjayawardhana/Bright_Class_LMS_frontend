import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-status-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-status-chip.component.html',
  styleUrls: ['./payment-status-chip.component.scss']
})
export class PaymentStatusChipComponent {
  @Input({ required: true }) status!: string;
}