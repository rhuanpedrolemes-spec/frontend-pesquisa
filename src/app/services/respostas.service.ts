import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resposta, RespostaSalva, ResumoRespostas } from '../models/resposta.model';

@Injectable({ providedIn: 'root' })
export class RespostasService {
  private readonly http = inject(HttpClient);
  private readonly respostasUrl = `${environment.apiBaseUrl}/api/respostas`;

  criarResposta(resposta: Resposta): Observable<RespostaSalva> {
    return this.http.post<RespostaSalva>(this.respostasUrl, resposta);
  }

  listarRespostas(): Observable<RespostaSalva[]> {
    return this.http.get<RespostaSalva[]>(this.respostasUrl);
  }

  resumo(): Observable<ResumoRespostas> {
    return this.http.get<ResumoRespostas>(`${this.respostasUrl}/resumo`);
  }

  excluirResposta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.respostasUrl}/${id}`);
  }

  /** Apaga TODAS as respostas. Exige login de administrador. */
  zerarRespostas(): Observable<{ apagadas: number }> {
    return this.http.delete<{ apagadas: number }>(this.respostasUrl);
  }
}
