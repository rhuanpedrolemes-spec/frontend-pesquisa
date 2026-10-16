import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { BarbeariaService } from '../../services/barbearia.service';
import { formatarMedia, formatarQuantidade } from '../../shared/rating.util';
import { StarRatingComponent } from '../../shared/star-rating/star-rating';
import { QuestionStarsComponent } from '../question-stars/question-stars';

@Component({
  selector: 'app-question-barbearia',
  standalone: true,
  imports: [StarRatingComponent, QuestionStarsComponent],
  templateUrl: './question-barbearia.html',
  styleUrl: './question-barbearia.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionBarbeariaComponent {
  readonly barbearia = inject(BarbeariaService);

  @Input() value: number | null = null;
  @Output() selected = new EventEmitter<number>();

  readonly foto = '/barbearia/fachada.webp';
  readonly formatarMedia = formatarMedia;
  readonly formatarQuantidade = formatarQuantidade;
}
