import { Inject, Injectable } from '@nestjs/common';
import {
  CheckOrthographyResult,
  CheckOrthographySignature,
} from './orthographyLib.types';

@Injectable()
export class CheckService {
  constructor(
    @Inject('OrthographyChecker')
    private checkOrthography: CheckOrthographySignature,
  ) {}

  checkText(text: string): CheckOrthographyResult {
    return this.checkOrthography(text);
  }
}
