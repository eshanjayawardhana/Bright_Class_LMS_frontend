import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-role-chip.component.html',
  styleUrls: ['./user-role-chip.component.scss'],
})
export class UserRoleChipComponent {
  @Input({ required: true }) role!: string;
}
