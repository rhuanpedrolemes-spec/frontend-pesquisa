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
  readonly erro = signal(false);

  entrar(): void {
    if (!this.username.trim() || !this.password.trim()) return;

    this.carregando.set(true);
    this.erro.set(false);

    this.auth.login(this.username.trim(), this.password).subscribe({
      next: ({ token }) => {
        this.auth.salvarToken(token);
        this.carregando.set(false);
        this.router.navigate(['/admin/painel']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set(true);
      },
    });
  }
}
