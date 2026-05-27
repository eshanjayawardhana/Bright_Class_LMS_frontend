import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-type-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-type-chip.component.html',
  styleUrls: ['./content-type-chip.component.scss']
})
export class ContentTypeChipComponent {
  @Input({ required: true }) type!: string;

  getLabel(): string {
    if (this.type === 'LIVE_CLASS') return 'Live Class';
    if (this.type === 'RECORDED_VIDEO') return 'Recorded Video';
    return this.type;
  }
}