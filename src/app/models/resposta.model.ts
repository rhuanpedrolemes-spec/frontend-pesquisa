export type FrequenciaCorte = '1 vez' | '2 vezes' | '3 vezes' | '4 vezes ou mais';

export type Objecao =
  | 'Sairia muito caro'
  | 'Não tenho tempo'
  | 'Não vejo motivo de cortar mais vezes';

export type InteressePlano = 'Sim' | 'Não';

export interface Barbeiro {
  _id: string;
  nome: string;
  slug: string;
  totalAvaliacoes: number;
  /** Média aritmética com os valores originais (arredondar só para exibir). */
  media: number | null;
}

export interface Resposta {
  clienteNome: string;
  clienteWhatsapp: string;
  /** Id do barbeiro escolhido na pesquisa. */
  barbeiro: string | null;
  /** Estrelas de 1 a 5 dadas ao barbeiro. */
  notaBarbeiro: number | null;
  /** Legado: nota 1-10 das respostas antigas. */
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

export interface RespostaSalva extends Omit<Resposta, 'barbeiro'> {
  _id: string;
  criadoEm: string;
  /** Vem populado pelo backend; ausente nas respostas antigas. */
  barbeiro?: { _id: string; nome: string; slug: string } | null;
}

export interface ResumoRespostas {
  total: number;
  mediaNotaAtendimento: number | null;
  mediaNotaBarbeiro: number | null;
  mediaSatisfacaoGeral: number | null;
}

export const RESPOSTA_VAZIA: Resposta = {
  clienteNome: '',
  clienteWhatsapp: '',
  barbeiro: null,
  notaBarbeiro: null,
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
