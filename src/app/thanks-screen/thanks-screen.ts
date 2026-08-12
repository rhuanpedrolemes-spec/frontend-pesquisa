import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../shared/icon/icon';
import { GOOGLE_REVIEW_URL } from '../shared/google-review';
import { SurveyFlowService } from '../survey/survey-flow.service';

@Component({
  selector: 'app-thanks-screen',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './thanks-screen.html',
  styleUrl: './thanks-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThanksScreenComponent {
  private readonly flow = inject(SurveyFlowService);

  readonly googleReviewUrl = GOOGLE_REVIEW_URL;

  novaAvaliacao(): void {
    this.flow.reiniciar();
  }
}
