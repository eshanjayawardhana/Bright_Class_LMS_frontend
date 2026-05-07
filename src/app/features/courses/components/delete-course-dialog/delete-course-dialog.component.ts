import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-course-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.scss'],
})
export class DeleteCourseDialogComponent {
  @Input({ required: true }) courseTitle = '';
  @Input() isDeleting = false;

  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
