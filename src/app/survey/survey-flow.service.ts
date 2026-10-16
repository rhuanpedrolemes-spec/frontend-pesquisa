import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Barbeiro, RESPOSTA_VAZIA, Resposta } from '../models/resposta.model';
import { BarbeirosService } from '../services/barbeiros.service';
import { RespostasService } from '../services/respostas.service';

export type ScreenId =
  | 'barbeiro'
  | 'atendimento'
  | 'assinante'
  | 'sat_assinatura'
  | 'sat_geral'
  | 'comentario'
  | 'frequencia'
  | 'objecao'
  | 'oferta'
  | 'oferta_confirmacao';

export type Stage = 'lock' | 'identificacao' | 'survey' | 'referral' | 'thanks';

export function computeFlow(a: Resposta): ScreenId[] {
  const flow: ScreenId[] = ['barbeiro', 'atendimento', 'assinante'];

  if (a.assinante === true) {
    flow.push('sat_assinatura', 'sat_geral', 'comentario');
  } else if (a.assinante === false) {
    flow.push('frequencia');

    if (a.frequenciaCorte === '1 vez') {
      flow.push('objecao');
      if (a.objecao === 'Sairia muito caro') {
        flow.push('oferta');
      }
    } else if (
      a.frequenciaCorte === '2 vezes' ||
      a.frequenciaCorte === '3 vezes' ||
      a.frequenciaCorte === '4 vezes ou mais'
    ) {
      flow.push('oferta');
    }

    if (a.interessePlano === 'Sim') {
      flow.push('oferta_confirmacao');
    }

    flow.push('sat_geral', 'comentario');
  }

  return flow;
}

@Injectable({ providedIn: 'root' })
export class SurveyFlowService {
  private readonly respostasService = inject(RespostasService);
  private readonly barbeirosService = inject(BarbeirosService);
  private jaSalvou = false;

  readonly barbeiroSelecionado = signal<Barbeiro | null>(null);
  readonly primeiroNomeBarbeiro = computed(
    () => this.barbeiroSelecionado()?.nome.split(' ')[0] ?? null
  );

  readonly answers = signal<Resposta>({ ...RESPOSTA_VAZIA });
  readonly stepIndex = signal(0);
  readonly stage = signal<Stage>('lock');
  readonly animKey = signal(0);

  readonly flow = computed(() => computeFlow(this.answers()));
  readonly screenId = computed<ScreenId | undefined>(() => this.flow()[this.stepIndex()]);
  readonly totalPerguntas = computed(() => this.flow().length);

  constructor() {
    // pré-carrega o ranking enquanto o cliente ainda está na tela inicial
    this.barbeirosService.carregar();

    // ao terminar o fluxo principal, segue para a tela de indicação
    effect(() => {
      if (this.stage() === 'survey' && this.stepIndex() >= this.flow().length) {
        this.animKey.update((k) => k + 1);
        this.stage.set('referral');
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

  atualizarComentario(comentario: string): void {
    this.answers.update((prev) => ({ ...prev, comentario }));
  }

  atualizarIndicacao(patch: Partial<Pick<Resposta, 'indicacaoNome' | 'indicacaoWhatsapp'>>): void {
    this.answers.update((prev) => ({ ...prev, ...patch }));
  }

  avancar(patch: Partial<Resposta> = {}): void {
    this.answers.update((prev) => ({ ...prev, ...patch }));
    setTimeout(() => {
      this.animKey.update((k) => k + 1);
      this.stepIndex.update((i) => i + 1);
    }, 260);
  }

  finalizarIndicacao(): void {
    this.animKey.update((k) => k + 1);
    this.stage.set('thanks');
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
