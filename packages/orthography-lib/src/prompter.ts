import { PromptResult } from 'orthography-interface';
import { Observable, from, map } from 'rxjs';

import { AiClient } from './ai-client.type';
import { GET_USER_CONTENT, SYSTEM_CONTENT } from './constants';

export const createPromptSender = (aiClient: AiClient) => (text: string): Observable<PromptResult[]> => {
    const completionConfig = {
        model: 'gpt-4',
        temperature: 0.0,
        messages: [{
            role: 'system',
            content: SYSTEM_CONTENT,
        }, {
            role: 'user',
            content: GET_USER_CONTENT(text),
        }],
    };
    return from(aiClient.createCompletion(completionConfig)).pipe(
        map((response) => {
            if (response !== null) {
                return response;
            }
            throw new Error('Got empty response from AI.');
        }),
        map((response) => JSON.parse(response))
    );
};
