import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-skeleton',
  standalone: true,
  template: `
    <div class="kpi-card skeleton-card">
      <div class="skeleton-icon"></div>
      <div class="skeleton-text-sm"></div>
      <div class="skeleton-text-lg"></div>
    </div>
  `,
  styleUrls: ['./kpi-skeleton.component.scss']
})
export class KpiSkeletonComponent {}