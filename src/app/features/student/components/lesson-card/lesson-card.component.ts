import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningContent } from '../../models/learning-content.model';

@Component({
  selector: 'app-lesson-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent {
  @Input({ required: true }) lesson!: LearningContent;
  @Input() active = false;
  @Output() selectLesson = new EventEmitter<LearningContent>();

  select(): void {
    this.selectLesson.emit(this.lesson);
  }
}