import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../shared/icon/icon';
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

  novaAvaliacao(): void {
    this.flow.reiniciar();
  }
}
