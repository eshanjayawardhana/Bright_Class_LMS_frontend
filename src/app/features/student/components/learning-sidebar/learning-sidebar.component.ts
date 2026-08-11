import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningContent } from '../../models/learning-content.model';
import { LessonCardComponent } from '../lesson-card/lesson-card.component';

@Component({
  selector: 'app-learning-sidebar',
  standalone: true,
  imports: [CommonModule, LessonCardComponent],
  templateUrl: './learning-sidebar.component.html',
  styleUrls: ['./learning-sidebar.component.scss']
})
export class LearningSidebarComponent {
  @Input() lessons: LearningContent[] = [];
  @Input() activeLessonId: number | null = null;
  @Output() lessonSelected = new EventEmitter<LearningContent>();

  selectLesson(lesson: LearningContent): void {
    this.lessonSelected.emit(lesson);
  }
}