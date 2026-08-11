export type FrequenciaCorte = '1 vez' | '2 vezes' | '3 vezes' | '4 vezes ou mais';

export type Objecao =
  | 'Sairia muito caro'
  | 'Não tenho tempo'
  | 'Não vejo motivo de cortar mais vezes';

export type InteressePlano = 'Sim' | 'Não';

export interface Resposta {
  clienteNome: string;
  clienteWhatsapp: string;
  notaAtendimento: number | null;
  assinante: boolean | null;
  satisfacaoAssinatura: number | null;
  satisfacaoGeral: number | null;
  comentario: string;
  frequenciaCorte: FrequenciaCorte | null;
  objecao: Objecao | null;
  interessePlano: InteressePlano | null;
  indicacaoNome: string;
  indicacaoWhatsapp: string;
}

export interface RespostaSalva extends Resposta {
  _id: string;
  criadoEm: string;
}

export interface ResumoRespostas {
  total: number;
  mediaNotaAtendimento: number | null;
  mediaSatisfacaoGeral: number | null;
}

export const RESPOSTA_VAZIA: Resposta = {
  clienteNome: '',
  clienteWhatsapp: '',
  notaAtendimento: null,
  assinante: null,
  satisfacaoAssinatura: null,
  satisfacaoGeral: null,
  comentario: '',
  frequenciaCorte: null,
  objecao: null,
  interessePlano: null,
  indicacaoNome: '',
  indicacaoWhatsapp: '',
};
