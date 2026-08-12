import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';

  readonly carregando = signal(false);
  readonly mensagemErro = signal<string | null>(null);

  entrar(): void {
    if (!this.username.trim() || !this.password.trim()) return;

    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.auth.login(this.username.trim(), this.password).subscribe({
      next: ({ token }) => {
        this.auth.salvarToken(token);
        this.carregando.set(false);
        this.router.navigate(['/admin/painel']);
      },
      error: (erro: HttpErrorResponse) => {
        this.carregando.set(false);
        this.mensagemErro.set(
          erro.status === 401
            ? 'Usuário ou senha inválidos'
            : 'Não foi possível conectar ao servidor. Tente novamente em alguns instantes.'
        );
      },
    });
  }
}
