import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractOrthographyService } from './orthography.type';
import { CorrectionResult } from './correction-result.type';
import { Environment } from '../environments/environment.type';
import { ENV } from '../environments/environment.provider';

@Injectable({
  providedIn: 'root'
})
export class OrthographyService implements AbstractOrthographyService {
  constructor(private http: HttpClient, @Inject(ENV) private environment: Environment) { }

  check(text: string): Observable<CorrectionResult> {
    return this.http.post<CorrectionResult>(this.environment.apiUrl, { text });
  }
}
