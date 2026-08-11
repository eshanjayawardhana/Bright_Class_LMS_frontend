import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { LearningContent } from '../../models/learning-content.model';
import { LearningSidebarComponent } from '../../components/learning-sidebar/learning-sidebar.component';

// Imports from existing content feature
import { PdfPreviewComponent } from '../../../content/components/pdf-preview/pdf-preview.component';
import { VideoPreviewComponent } from '../../../content/components/video-preview/video-preview.component';

@Component({
  selector: 'app-course-learning',
  standalone: true,
  imports: [
    CommonModule,
    LearningSidebarComponent,
    VideoPreviewComponent,
    PdfPreviewComponent
  ],
  templateUrl: './course-learning.component.html',
  styleUrls: ['./course-learning.component.scss']
})
export class CourseLearningComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);

  lessons: LearningContent[] = [];
  activeLesson: LearningContent | null = null;
  loading = true;
  courseId = 0;

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.loadLessons();
    }
  }

  loadLessons(): void {
    this.loading = true;
    this.studentService.getCourseContents(this.courseId).subscribe({
      next: (res) => {
        this.lessons = res;
        if (res.length > 0) {
          this.activeLesson = res[0];
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectLesson(lesson: LearningContent): void {
    this.activeLesson = lesson;
  }

  goBack(): void {
    this.router.navigate(['/student/courses']);
  }
}