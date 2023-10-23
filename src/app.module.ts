import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { DbMongooseModule } from '@app/db-mongoose';
import { AppConfig } from './app.config';
import { SwapiModule } from '@app/swapi';
import { UserController } from './controllers/user.controller';
import { FilmController } from './controllers/film.controller';
import { UserModule } from '@app/db-mongoose/user/user.module';
import { FilmModule } from '@app/db-mongoose/film/film.module';
import { AuthenticateModule } from '@app/authenticate';
import { JwtValidateMiddleware } from './middlewares/jwt-validate.middleware';
import { AdminMiddleware } from './middlewares/admin-validate.middleware';
import { RegularMiddleware } from './middlewares/regular-validate.middleware';
import { SwapiController } from './controllers/swapi.controller';

@Module({
  imports: [
    AuthenticateModule.forRoot({ jtwSecret: AppConfig.jwt.secret }),
    DbMongooseModule.forRoot(AppConfig.database.url),
    UserModule,
    FilmModule,
    SwapiModule.forRoot({ baseURL: AppConfig.swapi.baseUrl }),
  ],
  controllers: [
    HealthController,
    UserController,
    FilmController,
    SwapiController,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidateMiddleware).forRoutes('/film', '/film/*');

    consumer
      .apply(RegularMiddleware)
      .forRoutes(
        { path: '/film', method: RequestMethod.GET },
        { path: '/film/*', method: RequestMethod.GET },
      );

    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: '/film/*', method: RequestMethod.PATCH },
        { path: '/film/*', method: RequestMethod.DELETE },
        { path: '/film', method: RequestMethod.POST },
        { path: '/film/*', method: RequestMethod.POST },
      );
  }
}
