import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss'],
})
export class UploadZoneComponent {
  @Output() filesSelected = new EventEmitter<File[]>();
  @Input() existingFileNames: string[] = [];

  selectedFiles: File[] = [];
  isDragging = false;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(Array.from(input.files));
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    const newUniqueFiles = files.filter(newFile => 
      !this.selectedFiles.some(existingFile => existingFile.name === newFile.name) &&
      !this.existingFileNames.includes(newFile.name)
    );

    if (newUniqueFiles.length < files.length) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Duplicates Skipped!',
        text: 'Some files are already attached.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
      });
    }

    this.selectedFiles = [...this.selectedFiles, ...newUniqueFiles];
    this.filesSelected.emit(this.selectedFiles);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filesSelected.emit(this.selectedFiles);
  }
}
