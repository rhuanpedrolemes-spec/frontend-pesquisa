import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FaceIconComponent } from '../../shared/face-icon/face-icon';
import { faceFor } from '../../shared/face-scale.util';

@Component({
  selector: 'app-question-scale-faces',
  standalone: true,
  imports: [FaceIconComponent],
  templateUrl: './question-scale-faces.html',
  styleUrl: './question-scale-faces.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionScaleFacesComponent {
  @Input() value: number | null = null;
  @Output() selected = new EventEmitter<number>();

  readonly nums = Array.from({ length: 10 }, (_, i) => i + 1);

  readonly faceFor = faceFor;

  onSelect(n: number): void {
    this.selected.emit(n);
  }

  cellBackground(n: number, color: string): string {
    return this.value === n ? `${color}22` : `${color}0d`;
  }

  cellBorderColor(n: number, color: string): string {
    return this.value === n ? color : `${color}33`;
  }
}
