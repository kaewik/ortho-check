import OpenAI from 'openai'

import { AiClient, CompletionConfig } from './ai-client.type';

export class OpenAiClient implements AiClient {
    private readonly client: OpenAI;

    constructor(apiKey: string) {
        this.client = new OpenAI({ apiKey });
    }

    public async createCompletion(config: CompletionConfig): Promise<string | null> {
        const completion = await this.client.chat.completions.create(config as any);
        return completion.choices[0].message.content;
    }
}
