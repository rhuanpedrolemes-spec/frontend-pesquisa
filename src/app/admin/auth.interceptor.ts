import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  const isChamadaProtegida = req.method === 'GET' && req.url.includes('/api/respostas');
  const token = auth.obterToken();

  const requisicao =
    isChamadaProtegida && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (isChamadaProtegida && erro.status === 401) {
        auth.limparToken();
        router.navigate(['/admin']);
      }
      return throwError(() => erro);
    })
  );
};
