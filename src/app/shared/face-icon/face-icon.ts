import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FaceKind } from '../face-scale.util';

@Component({
  selector: 'app-face-icon',
  standalone: true,
  templateUrl: './face-icon.html',
  styleUrl: './face-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaceIconComponent {
  @Input({ required: true }) kind!: FaceKind;
  @Input({ required: true }) color!: string;
  @Input() selected = false;
  @Input() size = 24;

  get strokeWidth(): number {
    return this.selected ? 2.4 : 2;
  }

  get fill(): string {
    return this.selected ? `${this.color}33` : 'transparent';
  }
}
