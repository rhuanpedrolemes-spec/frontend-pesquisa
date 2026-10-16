import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../shared/icon/icon';
import { QuestionBarbeiroComponent } from './question-barbeiro/question-barbeiro';
import { QuestionChoiceComponent } from './question-choice/question-choice';
import { QuestionScaleFacesComponent } from './question-scale-faces/question-scale-faces';
import { QuestionStarsComponent } from './question-stars/question-stars';
import { SurveyFlowService } from './survey-flow.service';
import { FrequenciaCorte, Objecao } from '../models/resposta.model';

const OPCOES_FREQUENCIA: FrequenciaCorte[] = ['1 vez', '2 vezes', '3 vezes', '4 vezes ou mais'];
const OPCOES_OBJECAO: Objecao[] = [
  'Sairia muito caro',
  'Não tenho tempo',
  'Não vejo motivo de cortar mais vezes',
];

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    FormsModule,
    IconComponent,
    QuestionBarbeiroComponent,
    QuestionChoiceComponent,
    QuestionScaleFacesComponent,
    QuestionStarsComponent,
  ],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyComponent {
  readonly flow = inject(SurveyFlowService);

  readonly opcoesFrequencia = OPCOES_FREQUENCIA;
  readonly opcoesObjecao = OPCOES_OBJECAO;

  onComentarioChange(valor: string): void {
    this.flow.atualizarComentario(valor);
  }
}
