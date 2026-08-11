import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCourse } from '../../models/catalog-course.model';

@Component({
  selector: 'app-course-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-hero.component.html',
  styleUrls: ['./course-hero.component.scss']
})
export class CourseHeroComponent {
  @Input({ required: true }) course!: CatalogCourse;
}