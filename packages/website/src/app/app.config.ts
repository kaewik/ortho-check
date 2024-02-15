import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { OrthographyService } from '../services/orthography.service';
import { AbstractOrthographyService } from '../services/orthography.type';
import { ENV, getEnv } from '../environments/environment.provider';

export const OrthographyServiceToken = new InjectionToken<AbstractOrthographyService>('OrthographyServiceToken');

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    { provide: OrthographyServiceToken, useClass: OrthographyService },
    { provide: ENV, useFactory: getEnv },
  ]
};
