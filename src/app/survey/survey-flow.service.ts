import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { RESPOSTA_VAZIA, Resposta } from '../models/resposta.model';
import { RespostasService } from '../services/respostas.service';

export type ScreenId =
  | 'atendimento'
  | 'assinante'
  | 'sat_assinatura'
  | 'sat_geral'
  | 'comentario'
  | 'frequencia'
  | 'objecao'
  | 'oferta'
  | 'oferta_confirmacao';

export type Stage = 'lock' | 'survey' | 'referral' | 'thanks';

export function computeFlow(a: Resposta): ScreenId[] {
  const flow: ScreenId[] = ['atendimento', 'assinante'];

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
  private jaSalvou = false;

  readonly answers = signal<Resposta>({ ...RESPOSTA_VAZIA });
  readonly stepIndex = signal(0);
  readonly stage = signal<Stage>('lock');
  readonly animKey = signal(0);

  readonly flow = computed(() => computeFlow(this.answers()));
  readonly screenId = computed<ScreenId | undefined>(() => this.flow()[this.stepIndex()]);
  readonly totalPerguntas = computed(() => this.flow().length);

  constructor() {
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

  iniciarPesquisa(): void {
    this.animKey.update((k) => k + 1);
    this.stage.set('survey');
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
    this.answers.set({ ...RESPOSTA_VAZIA });
    this.stepIndex.set(0);
    this.animKey.update((k) => k + 1);
    this.stage.set('lock');
  }
}
