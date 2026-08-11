import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'admin_token';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly http = inject(HttpClient);
  private readonly loginUrl = `${environment.apiBaseUrl}/api/admin/login`;

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password });
  }

  salvarToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  obterToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  limparToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return !!this.obterToken();
  }
}
