import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RespostaSalva, ResumoRespostas } from '../../models/resposta.model';
import { RespostasService } from '../../services/respostas.service';
import { AdminListComponent } from '../admin-list/admin-list';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-painel',
  standalone: true,
  imports: [AdminListComponent],
  templateUrl: './painel.html',
  styleUrl: './painel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PainelComponent implements OnInit {
  private readonly respostasService = inject(RespostasService);
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly respostas = signal<RespostaSalva[] | null>(null);
  readonly resumo = signal<ResumoRespostas | null>(null);

  ngOnInit(): void {
    forkJoin({
      respostas: this.respostasService.listarRespostas(),
      resumo: this.respostasService.resumo(),
    }).subscribe({
      next: ({ respostas, resumo }) => {
        this.respostas.set(respostas);
        this.resumo.set(resumo);
        this.loading.set(false);
      },
      error: (erro) => {
        this.loading.set(false);
        console.error('Falha ao carregar respostas:', erro);
      },
    });
  }

  sair(): void {
    this.auth.limparToken();
    this.router.navigate(['/admin']);
  }
}
