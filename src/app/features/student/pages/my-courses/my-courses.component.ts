import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { StudentCourse } from '../../models/student-course.model';
import { EnrolledCourseCardComponent } from '../../components/enrolled-course-card/enrolled-course-card.component';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, EnrolledCourseCardComponent],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  private studentService = inject(StudentService);

  courses: StudentCourse[] = [];
  filteredCourses: StudentCourse[] = [];
  loading = true;
  searchTerm = '';

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.studentService.getMyCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterCourses(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.instructorName.toLowerCase().includes(term)
    );
  }

  get completedCourses(): number {
    return this.courses.filter(c => c.progress === 100).length;
  }

  get inProgressCourses(): number {
    return this.courses.filter(c => c.progress > 0 && c.progress < 100).length;
  }
}