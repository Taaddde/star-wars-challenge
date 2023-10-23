import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

import { MediaServiceMock } from '../mocks/media-service.mock';
import { AuthenticateServiceMock } from '../mocks/authenticate-service.mock';

import { MediaService } from '../../libs/db-mongoose/src/media/media.service';
import { AuthenticateService } from '../../libs/authenticate/src';

describe('MediaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MediaService)
      .useClass(MediaServiceMock)
      .overrideProvider(AuthenticateService)
      .useClass(AuthenticateServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/media (POST) - Create Media', () => {
    return request(app.getHttpServer())
      .post('/media')
      .set('Authorization', 'admin-token')
      .send({
        characters: ['Batman', 'Guason'],
        producer: 'Tadeo',
        director: 'Tadeo',
        releaseDate: '2023/03/28',
        description: 'Es una historia muy conmovedora',
        title: 'Batman',
      })
      .expect(201);
  });

  it('/media/:id (PATCH) - Update Media', () => {
    const mediaId = 'your-media-id';
    return request(app.getHttpServer())
      .patch(`/media/${mediaId}`)
      .set('Authorization', 'admin-token')
      .send({
        description: 'Nueva descripción',
      })
      .expect(200);
  });

  it('/media/:id (DELETE) - Delete Media', () => {
    const mediaId = 'your-media-id';
    return request(app.getHttpServer())
      .delete(`/media/${mediaId}`)
      .set('Authorization', 'admin-token')
      .expect(200);
  });

  it('/media (GET) - Get Media List', () => {
    return request(app.getHttpServer())
      .get('/media')
      .set('Authorization', 'regular-token')
      .expect(200);
  });

  it('/media/:id (GET) - Get Movie Details', () => {
    const mediaId = 'your-media-id';
    return request(app.getHttpServer())
      .get(`/media/${mediaId}`)
      .set('Authorization', 'regular-token')
      .expect(200);
  });

  it('Authorize error - Admin user enter to a Regular user resource', () => {
    const mediaId = 'your-media-id';
    return request(app.getHttpServer())
      .get(`/media/${mediaId}`)
      .set('Authorization', 'admin-token')
      .expect(403);
  });

  it('Authorize error - Regular user enter to a Admin user resource', () => {
    const mediaId = 'your-media-id';
    return request(app.getHttpServer())
      .patch(`/media/${mediaId}`)
      .set('Authorization', 'regular-token')
      .expect(403);
  });
});
