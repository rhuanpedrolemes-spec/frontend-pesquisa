import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Cinco estrelas preenchidas proporcionalmente à nota (ex.: 4,6 → 4 cheias + 60% da quinta). */
@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
  @Input() value: number | null = null;
  @Input() size = 14;

  readonly estrelas = [0, 1, 2, 3, 4];

  get percentual(): number {
    const v = Math.min(Math.max(this.value ?? 0, 0), 5);
    return (v / 5) * 100;
  }
}
