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
}
