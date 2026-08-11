import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RespostaSalva, ResumoRespostas } from '../models/resposta.model';
import { RespostasService } from '../services/respostas.service';
import { AdminListComponent } from './admin-list/admin-list';
import { PinPadComponent } from './pin-pad/pin-pad';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AdminListComponent, PinPadComponent],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  @Output() closed = new EventEmitter<void>();

  private readonly respostasService = inject(RespostasService);

  readonly pinInput = signal('');
  readonly pinError = signal(false);
  readonly authed = signal(false);
  readonly loading = signal(false);
  readonly respostas = signal<RespostaSalva[] | null>(null);
  readonly resumo = signal<ResumoRespostas | null>(null);

  onDigit(d: string): void {
    if (this.pinInput().length >= 4) return;
    const proximo = this.pinInput() + d;
    this.pinInput.set(proximo);
    this.pinError.set(false);

    if (proximo.length === 4) {
      this.loading.set(true);
      forkJoin({
        respostas: this.respostasService.listarRespostas(proximo),
        resumo: this.respostasService.resumo(proximo),
      }).subscribe({
        next: ({ respostas, resumo }) => {
          this.respostas.set(respostas);
          this.resumo.set(resumo);
          this.authed.set(true);
          this.loading.set(false);
        },
        error: (erro) => {
          this.loading.set(false);
          this.pinError.set(true);
          setTimeout(() => {
            this.pinInput.set('');
            this.pinError.set(false);
          }, 500);
          if (erro?.status !== 401) {
            console.error('Falha ao carregar respostas:', erro);
          }
        },
      });
    }
  }

  onDelete(): void {
    this.pinInput.update((p) => p.slice(0, -1));
  }

  fechar(): void {
    this.closed.emit();
    this.pinInput.set('');
    this.pinError.set(false);
    this.authed.set(false);
    this.respostas.set(null);
    this.resumo.set(null);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.fechar();
    }
  }
}
