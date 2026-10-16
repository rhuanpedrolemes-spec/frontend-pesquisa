import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Barbeiro, RESPOSTA_VAZIA, Resposta } from '../models/resposta.model';
import { BarbeariaService } from '../services/barbearia.service';
import { BarbeirosService } from '../services/barbeiros.service';
import { RespostasService } from '../services/respostas.service';

export type ScreenId = 'barbeiro' | 'atendimento' | 'barbearia' | 'melhoria';

export type Stage = 'lock' | 'identificacao' | 'survey' | 'thanks';

/**
 * Perguntas da pesquisa, na ordem: quem atendeu, estrelas do barbeiro,
 * estrelas da barbearia e o que precisa melhorar (texto opcional).
 */
export const PERGUNTAS: readonly ScreenId[] = ['barbeiro', 'atendimento', 'barbearia', 'melhoria'];

@Injectable({ providedIn: 'root' })
export class SurveyFlowService {
  private readonly respostasService = inject(RespostasService);
  private readonly barbeirosService = inject(BarbeirosService);
  private readonly barbeariaService = inject(BarbeariaService);
  private jaSalvou = false;

  readonly barbeiroSelecionado = signal<Barbeiro | null>(null);
  readonly primeiroNomeBarbeiro = computed(
    () => this.barbeiroSelecionado()?.nome.split(' ')[0] ?? null
  );

  readonly answers = signal<Resposta>({ ...RESPOSTA_VAZIA });
  readonly stepIndex = signal(0);
  readonly stage = signal<Stage>('lock');
  readonly animKey = signal(0);

  readonly screenId = computed<ScreenId | undefined>(() => PERGUNTAS[this.stepIndex()]);
  readonly totalPerguntas = PERGUNTAS.length;

  constructor() {
    // pré-carrega o ranking enquanto o cliente ainda está na tela inicial
    this.barbeirosService.carregar();
    this.barbeariaService.carregar();

    // ao responder a última pergunta, segue para o agradecimento
    effect(() => {
      if (this.stage() === 'survey' && this.stepIndex() >= PERGUNTAS.length) {
        this.animKey.update((k) => k + 1);
        this.stage.set('thanks');
      }
    });

    // ao chegar na tela de agradecimento, salva a resposta uma única vez
    effect(() => {
      if (this.stage() === 'thanks' && !this.jaSalvou) {
        this.jaSalvou = true;
        this.respostasService.criarResposta(this.answers()).subscribe({
          error: (erro) => console.error('Falha ao salvar resposta:', erro),
        });
      }
    });
  }

  mostrarIdentificacao(): void {
    // atualiza o ranking (a avaliação do cliente anterior já pode ter mudado as posições)
    this.barbeirosService.carregar();
    this.barbeariaService.carregar();
    this.animKey.update((k) => k + 1);
    this.stage.set('identificacao');
  }

  selecionarBarbeiro(barbeiro: Barbeiro): void {
    this.barbeiroSelecionado.set(barbeiro);
    this.avancar({ barbeiro: barbeiro._id });
  }

  iniciarPesquisa(): void {
    this.animKey.update((k) => k + 1);
    this.stage.set('survey');
  }

  atualizarCliente(patch: Partial<Pick<Resposta, 'clienteNome' | 'clienteWhatsapp'>>): void {
    this.answers.update((prev) => ({ ...prev, ...patch }));
  }

  avancar(patch: Partial<Resposta> = {}): void {
    this.answers.update((prev) => ({ ...prev, ...patch }));
    setTimeout(() => {
      this.animKey.update((k) => k + 1);
      this.stepIndex.update((i) => i + 1);
    }, 260);
  }

  reiniciar(): void {
    this.jaSalvou = false;
    this.barbeiroSelecionado.set(null);
    this.answers.set({ ...RESPOSTA_VAZIA });
    this.stepIndex.set(0);
    this.animKey.update((k) => k + 1);
    this.stage.set('lock');
  }
}
