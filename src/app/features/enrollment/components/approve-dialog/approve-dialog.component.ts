import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-approve-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.scss'],
})
export class ApproveDialogComponent {
  @Input({ required: true }) studentName = '';
  @Input({ required: true }) courseTitle = '';
  @Input() isProcessing = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
