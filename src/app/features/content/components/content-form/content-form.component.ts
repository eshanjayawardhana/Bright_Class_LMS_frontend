import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UploadZoneComponent } from '../upload-zone/upload-zone.component';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, UploadZoneComponent],
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {
  @Input() isProcessing = false;
  @Input() courseId!: number;
  @Output() formSubmit = new EventEmitter<FormData>();

  form!: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      contentType: ['LIVE_CLASS', [Validators.required]],
      url: [''], 
      scheduledTime: [''] 
    });

    this.onTypeChange();
    this.form.get('contentType')?.valueChanges.subscribe(() => {
      this.onTypeChange();
    });
  }

  onTypeChange(): void {
    const type = this.form.get('contentType')?.value;
    const urlControl = this.form.get('url');
    const timeControl = this.form.get('scheduledTime');

    if (type === 'DOCUMENT') {
      urlControl?.clearValidators();
    } else {
      urlControl?.setValidators([Validators.required]);
    }
    
    timeControl?.setValidators([Validators.required]);
    urlControl?.updateValueAndValidity();
    timeControl?.updateValueAndValidity();
  }

  get isLiveClass(): boolean {
    return this.form.get('contentType')?.value === 'LIVE_CLASS';
  }

  get isDocument(): boolean {
    return this.form.get('contentType')?.value === 'DOCUMENT';
  }

  onFilesSelected(files: File[]): void {
    this.selectedFiles = files;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isDocument && this.selectedFiles.length === 0) {
      alert('At least one document file is required for Document type.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value || '');
    formData.append('description', this.form.get('description')?.value || '');
    formData.append('contentType', this.form.get('contentType')?.value || '');
    formData.append('courseId', this.courseId.toString());

    if (!this.isDocument) {
      formData.append('url', this.form.get('url')?.value || '');
    }

    if (this.form.get('scheduledTime')?.value) {
      formData.append('scheduledTime', this.form.get('scheduledTime')?.value);
    }

  
    if (this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
    }

    this.formSubmit.emit(formData);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}