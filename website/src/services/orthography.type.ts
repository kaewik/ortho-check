import { Observable } from 'rxjs';
import { CorrectionResult } from './correction-result.type';

export type AbstractOrthographyService = {
  check: (text: string) => Observable<CorrectionResult>
};
