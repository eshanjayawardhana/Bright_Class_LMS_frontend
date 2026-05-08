import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.scss']
})
export class ImageViewerModalComponent {
  @Input({ required: true }) imageUrl = '';
  @Output() closeDialog = new EventEmitter<void>();
}