import { lastValueFrom } from 'rxjs';
import { setupOrthographyChecker } from '../index';

describe('E2E Tests', () => {
    let checkOrthography: ReturnType<typeof setupOrthographyChecker>;

    beforeEach(() => {
        const apiKey = process.env['AI_API_KEY'];
        const model = process.env['AI_MODEL'];
        if (!apiKey) {
            fail("Environmental variable AI_API_KEY not set!");
        } else if (!model) {
            fail("Environmental variable AI_MODEL not set!");
        } else {
            checkOrthography = setupOrthographyChecker({
                apiKey,
                modelConfig: {
                    model,
                    temperature: 0.0,
                },
            });
        }
    });

    it('should spot the problems and explain them', async () => {
        const textWithProblems = "Diese Satz hat einen Fehler.";

        const result = await lastValueFrom(checkOrthography(textWithProblems));

        expect(result[0].startPos).toBe(1);
        expect(result[0].endPos).toBe(5);
        expect(result[0].outputSequence).toMatch('Dieser');
        expect(result[0].explanation).toBeDefined();
    }, 60_000);
});
