import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verify-payment-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './verify-payment-dialog.component.html',
  styleUrls: ['./verify-payment-dialog.component.scss']
})
export class VerifyPaymentDialogComponent {
  @Input({ required: true }) studentName = '';
  @Input({ required: true }) courseTitle = '';
  @Input({ required: true }) amount = 0;
  @Input() isProcessing = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}