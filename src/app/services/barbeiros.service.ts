import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { Barbeiro } from '../models/resposta.model';

export type StatusBarbeiros = 'carregando' | 'ok' | 'erro';

@Injectable({ providedIn: 'root' })
export class BarbeirosService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/api/barbeiros`;

  /** Já vem ordenado pelo backend (mais avaliações → maior média → nome). */
  readonly lista = signal<Barbeiro[]>([]);
  readonly status = signal<StatusBarbeiros>('carregando');

  /**
   * Busca o ranking. Se já há dados, atualiza em silêncio (sem voltar para "carregando").
   * Tenta de novo algumas vezes porque o backend gratuito pode estar "acordando".
   */
  carregar(): void {
    if (this.lista().length === 0) {
      this.status.set('carregando');
    }

    this.http
      .get<Barbeiro[]>(this.url)
      .pipe(retry({ count: 4, delay: 3000 }))
      .subscribe({
        next: (barbeiros) => {
          this.lista.set(barbeiros);
          this.status.set('ok');
        },
        error: (erro) => {
          console.error('Falha ao carregar barbeiros:', erro);
          if (this.lista().length === 0) {
            this.status.set('erro');
          }
        },
      });
  }
}
