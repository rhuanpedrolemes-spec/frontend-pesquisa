import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../shared/icon/icon';
import { SurveyFlowService } from '../survey/survey-flow.service';

@Component({
  selector: 'app-welcome-form',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './welcome-form.html',
  styleUrl: './welcome-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeFormComponent {
  readonly flow = inject(SurveyFlowService);

  readonly podeContinuar = computed(
    () =>
      this.flow.answers().clienteNome.trim().length > 0 &&
      this.flow.answers().clienteWhatsapp.trim().length > 0
  );

  onNomeChange(valor: string): void {
    this.flow.atualizarCliente({ clienteNome: valor });
  }

  onWhatsappChange(valor: string): void {
    this.flow.atualizarCliente({ clienteWhatsapp: valor });
  }

  continuar(): void {
    if (!this.podeContinuar()) return;
    this.flow.iniciarPesquisa();
  }
}
