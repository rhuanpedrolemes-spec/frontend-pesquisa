import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pin-pad',
  standalone: true,
  templateUrl: './pin-pad.html',
  styleUrl: './pin-pad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinPadComponent {
  @Input() value = '';
  @Input() error = false;
  @Output() digit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();

  readonly keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];
  readonly dots = [0, 1, 2, 3];

  onKeyPress(key: string): void {
    if (key === 'del') {
      this.delete.emit();
    } else {
      this.digit.emit(key);
    }
  }
}
