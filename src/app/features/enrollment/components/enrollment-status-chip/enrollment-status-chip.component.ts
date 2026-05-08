import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment-status-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollment-status-chip.component.html',
  styleUrls: ['./enrollment-status-chip.component.scss'],
})
export class EnrollmentStatusChipComponent {
  @Input({ required: true }) status!: string;
}
