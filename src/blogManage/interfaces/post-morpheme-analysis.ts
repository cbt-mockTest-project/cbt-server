export interface PostMorphemeAnalysisResponse {
  return_object: ReturnObject;
}

export interface ReturnObject {
  sentence: Sentence[];
}

export interface Sentence {
  text: string;
  morp: Morp[];
  morp_eval: MorpEval[];
  word: Word[];
}

export interface Morp {
  id: number;
  lemma: string;
  type: string;
  position: number;
  weight: number;
}

export interface MorpEval {
  id: number;
  result: string;
  target: string;
}

export interface Word {
  id: number;
  text: string;
  type: string;
  begin: number;
  end: number;
}
