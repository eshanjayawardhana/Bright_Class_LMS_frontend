import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { COURSE_CATEGORIES } from '../../constants/course-categories';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, RouterModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  @Input() initialData: Course | null = null;
  @Input() isLoading = false;

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  categories = COURSE_CATEGORIES;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData && this.form) {
      this.form.patchValue({
        title: this.initialData.title,
        code: this.initialData.code,
        lecturerEmail: this.initialData.lecturerEmail,
        description: this.initialData.description,
        category: this.initialData.category,
        year: this.initialData.year,
        semester: this.initialData.semester,
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: [
        this.initialData?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      code: [
        this.initialData?.code || '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)],
      ],
      lecturerEmail: [
        this.initialData?.lecturerEmail || '',
        [Validators.required, Validators.email],
      ],
      description: [
        this.initialData?.description || '',
        [Validators.required, Validators.minLength(10)],
      ],
      category: [this.initialData?.category || '', [Validators.required]],
      year: [
        this.initialData?.year || 1,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      semester: [
        this.initialData?.semester || 1,
        [Validators.required, Validators.min(1), Validators.max(2)],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.value);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
