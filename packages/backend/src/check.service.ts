import { Injectable } from '@nestjs/common';
import { CheckOrthographySignature } from './orthographyLib.types';

@Injectable()
export class CheckService {
  constructor(private checkOrthography: CheckOrthographySignature) {}

  getHello(): string {
    return 'Hello World!';
  }
}
