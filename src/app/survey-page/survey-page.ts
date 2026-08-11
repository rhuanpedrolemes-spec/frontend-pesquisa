import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LockScreenComponent } from '../lock-screen/lock-screen';
import { ReferralScreenComponent } from '../referral-screen/referral-screen';
import { LOGO_SRC } from '../shared/logo';
import { SurveyComponent } from '../survey/survey';
import { SurveyFlowService } from '../survey/survey-flow.service';
import { ThanksScreenComponent } from '../thanks-screen/thanks-screen';
import { WelcomeFormComponent } from '../welcome-form/welcome-form';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    LockScreenComponent,
    ReferralScreenComponent,
    SurveyComponent,
    ThanksScreenComponent,
    WelcomeFormComponent,
  ],
  templateUrl: './survey-page.html',
  styleUrl: './survey-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyPageComponent {
  readonly flow = inject(SurveyFlowService);

  readonly logoSrc = LOGO_SRC;

  readonly stepNumber = computed(() => this.flow.stepIndex() + 1);
  readonly showProgress = computed(() => this.flow.stage() === 'survey');
  readonly progressPercent = computed(
    () => (this.stepNumber() / this.flow.totalPerguntas()) * 100
  );

  onUnlocked(): void {
    this.flow.mostrarIdentificacao();
  }
}
