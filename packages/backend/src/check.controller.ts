import { Body, Controller, Post } from '@nestjs/common';
import { CheckOrthographyResult } from './orthographyLib.types';
import { CheckService } from './check.service';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  public checkOrthography(@Body('text') text: string): CheckOrthographyResult {
    return this.checkService.checkText(text);
  }
}
