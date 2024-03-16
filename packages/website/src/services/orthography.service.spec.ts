import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ENV } from '../environments/environment.provider';
import { OrthographyService } from './orthography.service';

describe('OrthographyService', () => {
  let service: OrthographyService;
  let httpTestingController: HttpTestingController;

  const fakeUrl = 'https://fake.url';
  const fakeEnv = { apiUrl: fakeUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ENV, useValue: fakeEnv }],
    });
    service = TestBed.inject(OrthographyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request', () => {
    const fakeText = 'Das ist ei Satz.';
    const fakeData = [
      {
        startPos: 9,
        endPos: 10,
        outputSequence: 'ein',
        explanation: 'Dies ist eine Beschreibung des Problems.',
      },
    ];
    service.check(fakeText).subscribe((data) => {
      expect(data).toEqual(fakeData);
    });

    const testRequest = httpTestingController.expectOne(fakeUrl + '/check');
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toEqual({ text: fakeText });
    expect(testRequest.request.headers.get('Content-Type')).toBe(
      'application/json',
    );

    testRequest.flush({ results: fakeData });
  });
});
