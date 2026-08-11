import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { StudentCourse } from '../../models/student-course.model';
import { Progress } from '../../models/progress.model';
import { EnrolledCourseCardComponent } from '../../components/enrolled-course-card/enrolled-course-card.component';
import { ProgressCardComponent } from '../../components/progress-card/progress-card.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, EnrolledCourseCardComponent, ProgressCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  private studentService = inject(StudentService);

  courses: StudentCourse[] = [];
  progress: Progress | null = null;
  loading = true;

  studentName = localStorage.getItem('userEmail')?.split('@')[0] || 'Student';

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    this.studentService.getMyCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        
        this.studentService.getMyProgress().subscribe({
          next: (progress) => {
            this.progress = progress;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}