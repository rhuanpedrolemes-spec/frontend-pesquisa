import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type IconName = 'check' | 'arrow-right' | 'gift' | 'sparkles';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size = 20;
  @Input() strokeWidth = 2;
  @Input() color = 'currentColor';
}
