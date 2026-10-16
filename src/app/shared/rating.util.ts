/** Arredonda para 1 casa (meio para cima, como o Google) e formata com vírgula: 4,8. */
export function formatarMedia(media: number): string {
  const arredondada = Math.round((media + Number.EPSILON) * 10) / 10;
  return arredondada.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/** "222 avaliações" / "1 avaliação" / "Sem avaliações". */
export function formatarQuantidade(total: number): string {
  if (total === 0) return 'Sem avaliações';
  const numero = total.toLocaleString('pt-BR');
  return total === 1 ? '1 avaliação' : `${numero} avaliações`;
}
