import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-stars',
  standalone: true,
  templateUrl: './question-stars.html',
  styleUrl: './question-stars.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionStarsComponent {
  @Input() value: number | null = null;
  @Output() selected = new EventEmitter<number>();

  readonly estrelas = [1, 2, 3, 4, 5];

  onSelect(n: number): void {
    this.selected.emit(n);
  }
}
