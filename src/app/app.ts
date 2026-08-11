import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AdminPanelComponent } from './admin-panel/admin-panel';
import { LockScreenComponent } from './lock-screen/lock-screen';
import { ReferralScreenComponent } from './referral-screen/referral-screen';
import { LOGO_SRC } from './shared/logo';
import { SurveyComponent } from './survey/survey';
import { SurveyFlowService } from './survey/survey-flow.service';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AdminPanelComponent,
    LockScreenComponent,
    ReferralScreenComponent,
    SurveyComponent,
    ThanksScreenComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly flow = inject(SurveyFlowService);

  readonly logoSrc = LOGO_SRC;
  readonly adminOpen = signal(false);

  private pressTimer: ReturnType<typeof setTimeout> | null = null;

  readonly stepNumber = computed(() => this.flow.stepIndex() + 1);
  readonly showProgress = computed(() => this.flow.stage() === 'survey');
  readonly progressPercent = computed(
    () => (this.stepNumber() / this.flow.totalPerguntas()) * 100
  );

  onUnlocked(): void {
    this.flow.iniciarPesquisa();
  }

  startLogoPress(): void {
    this.pressTimer = setTimeout(() => {
      this.adminOpen.set(true);
    }, 900);
  }

  endLogoPress(): void {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = null;
    }
  }

  closeAdmin(): void {
    this.adminOpen.set(false);
  }
}
