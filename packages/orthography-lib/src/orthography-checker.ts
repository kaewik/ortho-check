import { PromptResult } from 'orthography-interface';
import { Observable } from 'rxjs';

import { OpenAiClient } from './openai-client';
import { createPromptSender } from './prompter';

export const setupOrthographyChecker = (aiApiToken: string) => (text: string): Observable<PromptResult[]> => {
    const openAiClient = new OpenAiClient(aiApiToken);
    const sendPrompt = createPromptSender(openAiClient);
    return sendPrompt(text);
};
