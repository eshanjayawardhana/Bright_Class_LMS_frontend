import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogCourse } from '../../models/catalog-course.model';

@Component({
  selector: 'app-catalog-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog-course-card.component.html',
  styleUrls: ['./catalog-course-card.component.scss']
})
export class CatalogCourseCardComponent {
  @Input({ required: true }) course!: CatalogCourse;
}