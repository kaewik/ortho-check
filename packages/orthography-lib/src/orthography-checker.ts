import { PromptResult } from 'orthography-interface';
import { Observable } from 'rxjs';

import { AiConfig } from './ai-client.type';
import { OpenAiClient } from './openai-client';
import { createPromptSender } from './prompter';

export const setupOrthographyChecker = (config: AiConfig, useFewShotPrompt = false) => (text: string): Observable<PromptResult[]> => {
    const openAiClient = new OpenAiClient(config);
    const sendPrompt = createPromptSender(openAiClient, useFewShotPrompt);
    return sendPrompt(text);
};
