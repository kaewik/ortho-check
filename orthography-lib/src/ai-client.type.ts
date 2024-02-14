export type AiMessage = {
    role: string,
    content: string,
};

export type CompletionConfig = {
    model: string,
    messages: AiMessage[],
    temperature: number,
};

export type AiClient = {
    createCompletion: (config: CompletionConfig) => Promise<string | null>
};
