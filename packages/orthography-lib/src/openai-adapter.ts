import OpenAI from 'openai';
import { AiMessage, AiModelConfig } from './ai-client.type';

export type CompletionConfig = {
  messages: AiMessage[];
} & AiModelConfig;

export type OpenAiCompletionConfig = AiModelConfig & CompletionConfig;

export class OpenAiAdapter {
  constructor(private readonly openAi: OpenAI) {}

  public async complete(
    config: OpenAiCompletionConfig,
  ): Promise<string | null> {
    const completion = await this.openAi.chat.completions.create(config as any);
    return completion.choices[0].message.content;
  }
}
