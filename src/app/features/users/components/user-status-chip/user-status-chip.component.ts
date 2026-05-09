import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-status-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-status-chip.component.html',
  styleUrls: ['./user-status-chip.component.scss'],
})
export class UserStatusChipComponent {
  @Input({ required: true }) status!: string;
}
