export type PromptResult = {
    inputSequence: string,
    outputSequence: string | undefined,
    explanation: string | undefined,
};

export type PromptResultsDTO = {
    results: PromptResult[],
};
