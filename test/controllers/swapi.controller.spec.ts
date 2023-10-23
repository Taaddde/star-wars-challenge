import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

import { MediaServiceMock } from '../mocks/media-service.mock';
import { AuthenticateServiceMock } from '../mocks/authenticate-service.mock';

import { MediaService } from '../../libs/db-mongoose/src/media/media.service';
import { AuthenticateService } from '../../libs/authenticate/src';
import { SwapiService } from '../../libs/swapi/src';
import { SwapiServiceMock } from '../mocks/swapi-service.mock';

describe('SwapiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MediaService)
      .useClass(MediaServiceMock)
      .overrideProvider(SwapiService)
      .useClass(SwapiServiceMock)
      .overrideProvider(AuthenticateService)
      .useClass(AuthenticateServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/swapi (POST) - Populate database', () => {
    return request(app.getHttpServer())
      .post('/swapi')
      .set('Authorization', 'admin-token')
      .expect(201);
  });
});
