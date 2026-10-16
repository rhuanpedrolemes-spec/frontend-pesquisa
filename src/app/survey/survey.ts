import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuestionBarbeiroComponent } from './question-barbeiro/question-barbeiro';
import { QuestionStarsComponent } from './question-stars/question-stars';
import { SurveyFlowService } from './survey-flow.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [QuestionBarbeiroComponent, QuestionStarsComponent],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  readonly flow = inject(SurveyFlowService);
}
