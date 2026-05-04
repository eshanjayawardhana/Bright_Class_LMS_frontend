import { Component, OnInit, ElementRef, ViewChild, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService, AdminDashboardStats } from '../../services/dashboard.service';
import { Chart, registerables } from 'chart.js';

import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { KpiSkeletonComponent } from '../../../../shared/components/kpi-skeleton/kpi-skeleton.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, KpiCardComponent, KpiSkeletonComponent, DataTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);

  @ViewChild('enrollmentChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  stats: AdminDashboardStats | null = null;
  loading = true;
  chartInstance: Chart | null = null;

  tableColumns: TableColumn[] = [
    { key: 'studentName', label: 'Student', type: 'user' },
    { key: 'courseName', label: 'Course', type: 'text' },
    { key: 'status', label: 'Status', type: 'badge' }
  ];

  ngOnInit() {
    this.loadStats();
  }

  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private loadStats() {
    this.loading = true;
    
    this.dashboardService.getAdminStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
        
        // Wait for Angular to render the view before drawing the chart
        setTimeout(() => this.renderChart(), 0);
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
        this.loading = false;
      }
    });
  }

  private renderChart() {
    if (!this.chartCanvas || !this.stats) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.stats.chartLabels,
        datasets: [{
          label: 'New Enrollments',
          data: this.stats.chartData,
          borderColor: '#2563eb', // Blue-600
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#2563eb',
          pointBorderWidth: 2,
          pointRadius: 4,
          fill: true,
          tension: 0.4 // Smooth curves
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
            bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            border: { display: false }
          },
          x: {
            grid: { display: false },
            border: { display: false }
          }
        }
      }
    });
  }
}