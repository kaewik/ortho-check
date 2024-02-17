import { PromptResult } from 'orthography-interface';
import { Observable, from, map } from 'rxjs';

import { AiClient } from './ai-client.type';
import { GET_USER_CONTENT_FEW_SHOT, SYSTEM_CONTENT } from './constants';

export const createPromptSender = (aiClient: AiClient, useFewShotPrompt: boolean) => (text: string): Observable<PromptResult[]> => {
    const messages = [{
        role: 'system',
        content: SYSTEM_CONTENT,
    }, {
        role: 'user',
        content: useFewShotPrompt ? GET_USER_CONTENT_FEW_SHOT(text) : text,
    }];
    return from(aiClient.createCompletion(messages)).pipe(
        map((response) => {
            if (response !== null) {
                return response;
            }
            throw new Error('Got empty response from AI.');
        }),
        map((response) => JSON.parse(response)),
        map((results) => results.map((result: any) => ({
            ...result,
            startPos: parseInt(result.startPos),
            endPos: parseInt(result.endPos),
        })))
    );
};
