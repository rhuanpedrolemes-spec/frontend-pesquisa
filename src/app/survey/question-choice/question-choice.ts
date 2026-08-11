import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon';

@Component({
  selector: 'app-question-choice',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './question-choice.html',
  styleUrl: './question-choice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionChoiceComponent {
  @Input({ required: true }) options: string[] = [];
  @Input() selected: string | null = null;
  @Output() choiceSelected = new EventEmitter<string>();

  onChoose(option: string): void {
    this.choiceSelected.emit(option);
  }
}
