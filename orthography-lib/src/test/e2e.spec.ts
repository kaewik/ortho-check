import { lastValueFrom } from 'rxjs';
import { setupOrthographyChecker } from '../index';

describe('E2E Tests', () => {
    let checkOrthography: ReturnType<typeof setupOrthographyChecker>;

    beforeEach(() => {
        const apiKey = process.env['AI_API_KEY'];
        if (!apiKey) {
            fail("Environmental variable AI_API_KEY not set!");
        } else {
            checkOrthography = setupOrthographyChecker(apiKey);
        }
    });

    it('should spot the problems and explain them', async () => {
        const textWithProblems = "Diese Satz hat einen Fehler.";

        const result = await lastValueFrom(checkOrthography(textWithProblems));

        expect(result[0].inputSequence).toMatch('Diese');
        expect(result[0].outputSequence).toMatch('Dieser');
        expect(result[0].explanation).toBeDefined();
    }, 10_000);
});
