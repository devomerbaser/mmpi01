export type MMPIScale = 'L' | 'F' | 'K' | 'Hs' | 'D' | 'Hy' | 'Pd' | 'Mf' | 'Pa' | 'Pt' | 'Sc' | 'Ma' | 'Si';

export interface Patient {
  firstName: string;
  lastName: string;
}

export interface Question {
  id: number;
  text: string;
  scale: MMPIScale;
  rawScore: number;
}

export interface Answer {
  questionId: number;
  value: boolean;
}

export interface Results {
  [key: string]: {
    rawScore: number;
    tScore: number;
  };
}