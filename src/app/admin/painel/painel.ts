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
  /** Ver as respostas é livre; só quem fez login pode excluir. */
  readonly logado = signal(this.auth.estaAutenticado());

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.loading.set(true);
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

  onExcluir(id: string): void {
    this.respostasService.excluirResposta(id).subscribe({
      next: () => this.carregar(),
      error: (erro) => console.error('Falha ao excluir resposta:', erro),
    });
  }

  /**
   * Apaga todas as respostas. Pede para digitar ZERAR e, antes de apagar,
   * baixa uma cópia (backup .json) de todas as respostas no aparelho.
   */
  onZerar(): void {
    const respostas = this.respostas() ?? [];
    const confirmacao = prompt(
      `Isso apaga as ${respostas.length} respostas e zera as médias dos barbeiros e da barbearia.\n` +
        'Uma cópia (backup) será baixada antes.\n\nDigite ZERAR para confirmar:'
    );
    if (confirmacao?.trim().toUpperCase() !== 'ZERAR') return;

    this.baixarBackup(respostas);
    this.respostasService.zerarRespostas().subscribe({
      next: ({ apagadas }) => {
        alert(`${apagadas} respostas apagadas.`);
        this.carregar();
      },
      error: (erro) => {
        console.error('Falha ao zerar respostas:', erro);
        alert('Não foi possível zerar as respostas. Nada foi apagado.');
      },
    });
  }

  private baixarBackup(respostas: RespostaSalva[]): void {
    const data = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(respostas, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `backup-respostas-${data}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  entrar(): void {
    this.router.navigate(['/admin/login']);
  }

  sair(): void {
    this.auth.limparToken();
    this.logado.set(false);
  }
}
