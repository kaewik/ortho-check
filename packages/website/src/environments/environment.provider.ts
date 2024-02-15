import { InjectionToken } from '@angular/core';

import { Environment } from './environment.type';
import { environment } from './environment';

export const ENV = new InjectionToken<Environment>('env');

export function getEnv(): Environment {
  return environment;
}
