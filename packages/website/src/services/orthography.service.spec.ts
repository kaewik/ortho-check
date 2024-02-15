import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: ENV, useValue: fakeEnv }]
    });
    service = TestBed.inject(OrthographyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request', () => {
    const fakeText = 'Fake text.';
    const fakeData = { diffs: [] };
    service.check(fakeText).subscribe(data => {
      expect(data).toEqual(fakeData);
    });

    const testRequest = httpTestingController.expectOne(fakeUrl);
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toEqual({ text: fakeText });

    testRequest.flush(fakeData);
  })
});