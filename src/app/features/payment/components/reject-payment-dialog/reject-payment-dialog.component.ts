import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reject-payment-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './reject-payment-dialog.component.html',
  styleUrls: ['./reject-payment-dialog.component.scss']
})
export class RejectPaymentDialogComponent {
  @Input({ required: true }) studentName = '';
  @Input() isProcessing = false;

  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  reason = '';

  onSubmit(): void {
    if (!this.reason.trim()) return;
    this.confirm.emit(this.reason);
  }
}