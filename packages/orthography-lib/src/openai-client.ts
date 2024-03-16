import { OpenAI } from 'openai';

import { AiClient, AiConfig, AiMessage, AiModelConfig } from './ai-client.type';
import { OpenAiAdapter } from './openai-adapter';

export class OpenAiClient implements AiClient {
  private readonly client: OpenAiAdapter;
  private readonly modelConfig: AiModelConfig;

  constructor(
    private readonly config: AiConfig,
    private readonly openAiAdapterFactory = (apiKey: string) =>
      new OpenAiAdapter(new OpenAI({ apiKey })),
  ) {
    this.client = this.openAiAdapterFactory(config.apiKey);
    this.modelConfig = config.modelConfig;
  }

  public createCompletion(messages: AiMessage[]): Promise<string | null> {
    return this.client.complete({
      messages,
      ...this.modelConfig,
    });
  }
}
