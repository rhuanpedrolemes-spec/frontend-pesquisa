import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-lock-screen',
  standalone: true,
  templateUrl: './lock-screen.html',
  styleUrl: './lock-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockScreenComponent {
  @Output() unlocked = new EventEmitter<void>();

  readonly videoSrc = '/video/inicio-v2.mp4';
  readonly barberPointUrl = 'https://barberpoint.app.br/c/boleiro';
  readonly unlocking = signal(false);

  onUnlock(): void {
    if (this.unlocking()) return;
    this.unlocking.set(true);
    setTimeout(() => {
      this.unlocked.emit();
    }, 420);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onUnlock();
    }
  }
}
