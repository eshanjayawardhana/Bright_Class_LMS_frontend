import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number | string;
  @Input({ required: true }) icon!: string;
  @Input() theme: 'blue' | 'purple' | 'teal' | 'orange' | 'green' = 'blue';
  @Input() borderTheme: 'none' | 'warning' | 'success' = 'none';
  @Input() isCurrency = false;
}