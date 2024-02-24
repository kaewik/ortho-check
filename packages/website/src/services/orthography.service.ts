import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PromptResult, PromptResultsDTO } from 'orthography-interface';
import { catchError, map, Observable, throwError } from 'rxjs';

import { AbstractOrthographyService } from './orthography.type';
import { Environment } from '../environments/environment.type';
import { ENV } from '../environments/environment.provider';

@Injectable({
  providedIn: 'root'
})
export class OrthographyService implements AbstractOrthographyService {
  constructor(private http: HttpClient, @Inject(ENV) private environment: Environment) { }

  public check(text: string): Observable<PromptResult[]> {
    return this.http.post<PromptResultsDTO>(
      this.environment.apiUrl + '/check',
      { text },
      {
        headers: new HttpHeaders({ 'Content-Type':  'application/json' })
      }).pipe(
        catchError(this.handleError),
        map((promptResultsDTO) => promptResultsDTO.results)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
