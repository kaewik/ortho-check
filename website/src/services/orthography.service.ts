import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractOrthographyService } from './orthography.type';
import { CorrectionResult } from './correction-result.type';

@Injectable({
  providedIn: 'root'
})
export class OrthographyService implements AbstractOrthographyService {
  constructor(private http: HttpClient) { }

  check(text: string): Observable<CorrectionResult> {
    return new Observable();
  }
}
