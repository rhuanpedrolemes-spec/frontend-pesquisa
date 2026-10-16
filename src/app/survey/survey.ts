import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuestionBarbeariaComponent } from './question-barbearia/question-barbearia';
import { QuestionBarbeiroComponent } from './question-barbeiro/question-barbeiro';
import { QuestionMelhoriaComponent } from './question-melhoria/question-melhoria';
import { QuestionStarsComponent } from './question-stars/question-stars';
import { SurveyFlowService } from './survey-flow.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    QuestionBarbeariaComponent,
    QuestionBarbeiroComponent,
    QuestionMelhoriaComponent,
    QuestionStarsComponent,
  ],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  readonly flow = inject(SurveyFlowService);
}
