import { Controller, Post } from '@nestjs/common';
import { CheckService } from './check.service';

@Controller()
export class CheckController {
  constructor(private readonly checkService: CheckService) {}
}
