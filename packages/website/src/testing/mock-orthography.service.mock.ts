import { of } from 'rxjs';

import { AbstractOrthographyService } from '../services/orthography.type';

export const orthographyServiceMock =
  jasmine.createSpyObj<AbstractOrthographyService>({
    check: of([
      {
        startPos: 1,
        endPos: 2,
        outputSequence: 'Ein',
        explanation: 'Das ist eine solide Beschreibung des Problems.',
      },
    ]),
  });
