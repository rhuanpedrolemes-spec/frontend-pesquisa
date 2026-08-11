export type FaceKind = 'angry' | 'frown' | 'meh' | 'smile' | 'laugh';

export interface FaceStage {
  max: number;
  kind: FaceKind;
  color: string;
}

export const FACE_STAGES: FaceStage[] = [
  { max: 2, kind: 'angry', color: '#e2554c' },
  { max: 4, kind: 'frown', color: '#e2833f' },
  { max: 6, kind: 'meh', color: '#dfae3a' },
  { max: 8, kind: 'smile', color: '#8dc25a' },
  { max: 10, kind: 'laugh', color: '#92a243' },
];

export function faceFor(n: number): FaceStage {
  return FACE_STAGES.find((s) => n <= s.max) ?? FACE_STAGES[FACE_STAGES.length - 1];
}
