import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

import { FilmServiceMock } from '../mocks/film-service.mock';
import { AuthenticateServiceMock } from '../mocks/authenticate-service.mock';

import { FilmService } from '../../libs/db-mongoose/src/film/film.service';
import { AuthenticateService } from '../../libs/authenticate/src';

describe('FilmController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FilmService)
      .useClass(FilmServiceMock)
      .overrideProvider(AuthenticateService)
      .useClass(AuthenticateServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/film (POST) - Create Film', () => {
    return request(app.getHttpServer())
      .post('/film')
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

  it('/film/:id (PATCH) - Update Film', () => {
    const filmId = 'your-film-id';
    return request(app.getHttpServer())
      .patch(`/film/${filmId}`)
      .set('Authorization', 'admin-token')
      .send({
        description: 'Nueva descripción',
      })
      .expect(200);
  });

  it('/film/:id (DELETE) - Delete Film', () => {
    const filmId = 'your-film-id';
    return request(app.getHttpServer())
      .delete(`/film/${filmId}`)
      .set('Authorization', 'admin-token')
      .expect(200);
  });

  it('/film (GET) - Get Film List', () => {
    return request(app.getHttpServer())
      .get('/film')
      .set('Authorization', 'regular-token')
      .expect(200);
  });

  it('/film/:id (GET) - Get Movie Details', () => {
    const filmId = 'your-film-id';
    return request(app.getHttpServer())
      .get(`/film/${filmId}`)
      .set('Authorization', 'regular-token')
      .expect(200);
  });

  it('Authorize error - Admin user enter to a Regular user resource', () => {
    const filmId = 'your-film-id';
    return request(app.getHttpServer())
      .get(`/film/${filmId}`)
      .set('Authorization', 'admin-token')
      .expect(403);
  });

  it('Authorize error - Regular user enter to a Admin user resource', () => {
    const filmId = 'your-film-id';
    return request(app.getHttpServer())
      .patch(`/film/${filmId}`)
      .set('Authorization', 'regular-token')
      .expect(403);
  });
});
