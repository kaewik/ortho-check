import { of } from 'rxjs';

import { AbstractOrthographyService } from '../services/orthography.type';

export const orthographyServiceMock = jasmine.createSpyObj<AbstractOrthographyService>({
  check: of({ diffs: []}),
});

