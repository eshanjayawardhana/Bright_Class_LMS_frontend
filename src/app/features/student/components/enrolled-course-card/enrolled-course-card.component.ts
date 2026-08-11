import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentCourse } from '../../models/student-course.model';

@Component({
  selector: 'app-enrolled-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrolled-course-card.component.html',
  styleUrls: ['./enrolled-course-card.component.scss']
})
export class EnrolledCourseCardComponent {
  @Input({ required: true }) course!: StudentCourse;
}