import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { AvaliacaoBarbearia } from '../models/resposta.model';

@Injectable({ providedIn: 'root' })
export class BarbeariaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/api/barbearia`;

  /** Fica null até carregar; se falhar, a pergunta aparece sem a média. */
  readonly avaliacao = signal<AvaliacaoBarbearia | null>(null);

  carregar(): void {
    this.http
      .get<AvaliacaoBarbearia>(this.url)
      .pipe(retry({ count: 4, delay: 3000 }))
      .subscribe({
        next: (avaliacao) => this.avaliacao.set(avaliacao),
        error: (erro) => console.error('Falha ao carregar avaliação da barbearia:', erro),
      });
  }
}
