import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { of } from 'rxjs';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CheckService } from '../src/check.service';
import { CheckOrthographySignature } from '../src/orthographyLib.types';

describe('CheckController (e2e)', () => {
  let app: INestApplication;
  let mockCheckOrthography: CheckOrthographySignature;
  const fakeResponseBody = [
    {
      startPos: 0,
      endPos: 1,
      outputSequence: 'Ei',
    },
  ];

  beforeEach(async () => {
    mockCheckOrthography = jest.fn(() => of(fakeResponseBody));
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CheckService)
      .useFactory({
        factory: () => new CheckService(mockCheckOrthography),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/check (POST)', () => {
    return request(app.getHttpServer())
      .post('/check')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(fakeResponseBody);
  });
});
