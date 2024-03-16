export type PromptResult = {
  startPos: number;
  endPos: number;
  outputSequence: string;
  explanation?: string;
};

export type PromptResultsDTO = {
  results: PromptResult[];
};
