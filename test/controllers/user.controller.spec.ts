import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from 'supertest';

import { UserServiceMock } from "../mocks/user-service.mock";
import { AuthenticateServiceMock } from "../mocks/authenticate-service.mock";

import { UserService } from "../../libs/db-mongoose/src/user/user.service";
import { AuthenticateService } from "../../libs/authenticate/src";

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const userServiceMock = {
    provide: UserService,
    useClass: UserServiceMock,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useClass(UserServiceMock)
      .overrideProvider(AuthenticateService)
      .useClass(AuthenticateServiceMock)
      .compile();

      
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST) - Create User', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        "username": "tade",
        "password": "tade",
        "email": "tade@hotmail.com"
      })
      .expect(201)
  });


  it('/user/login (POST) - Login User', () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({
        "username": "valid-user",
        "password": "valid-password"
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('username');
      });
  });

  it('/user (GET) - Get User List', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('/user/:id (GET) - Get User by Id', () => {
    const userId = 'some-valid-user-id';

    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('email');
      });
  });
});
