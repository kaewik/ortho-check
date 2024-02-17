import { lastValueFrom } from 'rxjs';

import { AiClient } from './ai-client.type';
import { GET_USER_CONTENT_FEW_SHOT, SYSTEM_CONTENT } from './constants';
import { createPromptSender } from './prompter';

describe('Prompter', () => {
    let sendPrompt: ReturnType<typeof createPromptSender>;
    let mockAiClient: jasmine.SpyObj<AiClient>;

    beforeEach(() => {
        mockAiClient = jasmine.createSpyObj<AiClient>(["createCompletion"]);
        mockAiClient.createCompletion.and.resolveTo(`[]`);
        sendPrompt = createPromptSender(mockAiClient, false);
    });

    it('should create a completion', async () => {
        const expectedInSeq = 'deutsche Satz';
        const fakeText = `Dies ist ein ${expectedInSeq}.`;
        const expectedOutSeq = 'deutscher';
        const expectedExpl = 'Der Kasus und Genus muss übereinstimmen.'
        const fakeResponse = `[{
            "startPos": "14",
            "endPos": "21",
            "outputSequence": "${expectedOutSeq}",
            "explanation": "${expectedExpl}"
        }]`;
        mockAiClient.createCompletion.and.resolveTo(fakeResponse);

        const actualResponse = await lastValueFrom(sendPrompt(fakeText));

        expect(actualResponse).toEqual([{
            startPos: 14,
            endPos: 21,
            outputSequence: expectedOutSeq,
            explanation: expectedExpl
        }]);
    });

    it('should setup the few shot prompt', async () => {
        const fakeText = `Dies ist kein korrekte Satz.`;

        sendPrompt = createPromptSender(mockAiClient, true);
        await lastValueFrom(sendPrompt(fakeText));

        expect(mockAiClient.createCompletion).toHaveBeenCalledOnceWith([{
            role: 'system',
            content: SYSTEM_CONTENT,
        }, {
            role: 'user',
            content: GET_USER_CONTENT_FEW_SHOT(fakeText),
        }]);
    });

    it('should setup the prompt for fine tuned models', async () => {
        const fakeText = `Dies ist kein korrekte Satz.`;

        await lastValueFrom(sendPrompt(fakeText));

        expect(mockAiClient.createCompletion).toHaveBeenCalledOnceWith([{
            role: 'system',
            content: SYSTEM_CONTENT,
        }, {
            role: 'user',
            content: fakeText,
        }]);
    });
})
