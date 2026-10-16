import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Barbeiro } from '../../models/resposta.model';
import { BarbeirosService } from '../../services/barbeiros.service';
import { formatarMedia, formatarQuantidade } from '../../shared/rating.util';
import { StarRatingComponent } from '../../shared/star-rating/star-rating';

@Component({
  selector: 'app-question-barbeiro',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './question-barbeiro.html',
  styleUrl: './question-barbeiro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBarbeiroComponent {
  readonly barbeiros = inject(BarbeirosService);

  @Input() selecionadoId: string | null = null;
  @Output() selected = new EventEmitter<Barbeiro>();

  readonly formatarMedia = formatarMedia;
  readonly formatarQuantidade = formatarQuantidade;

  foto(barbeiro: Barbeiro): string {
    return `/barbeiros/${barbeiro.slug}.jpg`;
  }

  onSelect(barbeiro: Barbeiro): void {
    this.selected.emit(barbeiro);
  }
}
