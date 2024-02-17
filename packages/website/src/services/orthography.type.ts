import { PromptResult } from 'orthography-interface';
import { Observable } from 'rxjs';

export type AbstractOrthographyService = {
  check: (text: string) => Observable<PromptResult[]>
};
