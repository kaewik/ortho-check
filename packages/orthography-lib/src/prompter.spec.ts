import { lastValueFrom } from 'rxjs';

import { AiClient } from './ai-client.type';
import { GET_USER_CONTENT, SYSTEM_CONTENT } from './constants';
import { createPromptSender } from './prompter';

describe('Prompter', () => {
    let sendPrompt: ReturnType<typeof createPromptSender>;
    let mockAiClient: jasmine.SpyObj<AiClient>;

    beforeEach(() => {
        mockAiClient = jasmine.createSpyObj<AiClient>(["createCompletion"]);
        mockAiClient.createCompletion.and.resolveTo(`[{
            "inputSequence": "fake",
            "outputSequence": "fake",
            "explanation": "fake"
        }]`);
        sendPrompt = createPromptSender(mockAiClient);
    });

    it('should create a completion', async () => {
        const expectedInSeq = 'deutsche Satzt';
        const fakeText = `Dies ist ein ${expectedInSeq}.`;
        const expectedOutSeq = 'deutscher Satz';
        const expectedExpl = 'Der Kasus und Genus muss übereinstimmen.'
        const fakeResponse = `[{
            "inputSequence": "${expectedInSeq}",
            "outputSequence": "${expectedOutSeq}",
            "explanation": "${expectedExpl}"
        }]`;
        mockAiClient.createCompletion.and.resolveTo(fakeResponse);

        const actualResponse = await lastValueFrom(sendPrompt(fakeText));

        expect(actualResponse).toEqual([{
            inputSequence: expectedInSeq,
            outputSequence: expectedOutSeq,
            explanation: expectedExpl
        }]);
    });

    it('should setup the proper prompt', async () => {
        const fakeText = `Dies ist kein korrekte Satz.`;

        await lastValueFrom(sendPrompt(fakeText));

        expect(mockAiClient.createCompletion).toHaveBeenCalledOnceWith({
            temperature: 0.0,
            model: 'gpt-4',
            messages: [{
                role: 'system',
                content: SYSTEM_CONTENT,
            }, {
                role: 'user',
                content: GET_USER_CONTENT(fakeText),
            }]
        });
    });
})
