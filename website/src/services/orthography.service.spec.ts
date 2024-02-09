import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrthographyService } from './orthography.service';

describe('OrthographyService', () => {
  let service: OrthographyService;
  let httpTestingController: HttpTestingController;

  const fakeUrl = 'https://fake.url';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(OrthographyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
