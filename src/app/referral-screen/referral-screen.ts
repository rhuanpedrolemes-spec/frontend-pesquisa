import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../shared/icon/icon';
import { SurveyFlowService } from '../survey/survey-flow.service';

@Component({
  selector: 'app-referral-screen',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './referral-screen.html',
  styleUrl: './referral-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralScreenComponent {
  readonly flow = inject(SurveyFlowService);

  readonly podeEnviar = computed(
    () =>
      this.flow.answers().indicacaoNome.trim().length > 0 &&
      this.flow.answers().indicacaoWhatsapp.trim().length > 0
  );

  onNomeChange(valor: string): void {
    this.flow.atualizarIndicacao({ indicacaoNome: valor });
  }

  onWhatsappChange(valor: string): void {
    this.flow.atualizarIndicacao({ indicacaoWhatsapp: valor });
  }

  continuar(): void {
    this.flow.finalizarIndicacao();
  }
}
