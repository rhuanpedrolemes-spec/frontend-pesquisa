import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RespostaSalva, ResumoRespostas } from '../../models/resposta.model';
import { faceFor } from '../../shared/face-scale.util';
import { formatarMedia } from '../../shared/rating.util';
import { StarRatingComponent } from '../../shared/star-rating/star-rating';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminListComponent {
  @Input() loading = false;
  @Input() resumo: ResumoRespostas | null = null;
  @Input() respostas: RespostaSalva[] | null = null;
  @Output() excluirResposta = new EventEmitter<string>();

  readonly faceFor = faceFor;

  onExcluir(id: string): void {
    if (confirm('Excluir esta resposta? Essa ação não pode ser desfeita.')) {
      this.excluirResposta.emit(id);
    }
  }

  get mediaBarbeiroFormatada(): string | null {
    const media = this.resumo?.mediaNotaBarbeiro;
    return media != null ? formatarMedia(media) : null;
  }

  get mediaAtendimentoFormatada(): string | null {
    const media = this.resumo?.mediaNotaAtendimento;
    return media != null ? media.toFixed(1) : null;
  }

  get mediaGeralFormatada(): string | null {
    const media = this.resumo?.mediaSatisfacaoGeral;
    return media != null ? media.toFixed(1) : null;
  }

  formatarData(criadoEm: string): string {
    return new Date(criadoEm).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
