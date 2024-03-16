import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { orthographyServiceMock } from './mock-orthography.service.mock';
import { AbstractOrthographyService } from '../services/orthography.type';
import { OrthographyServiceToken } from '../app/app.config';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  providers: [
    { provide: OrthographyServiceToken, useValue: orthographyServiceMock },
  ],
})
export class TestingModule {}
