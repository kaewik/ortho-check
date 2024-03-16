export type AiMessage = {
  role: string;
  content: string;
};

export type AiConfig = {
  apiKey: string;
  modelConfig: AiModelConfig;
};

export type AiModelConfig = {
  model: string;
  temperature: number;
};

export type AiClient = {
  createCompletion: (messages: AiMessage[]) => Promise<string | null>;
};
