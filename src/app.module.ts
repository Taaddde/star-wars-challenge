import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbMongooseModule } from '@app/db-mongoose';
import { AppConfig } from './app.config';
import { SwapiModule } from '@app/swapi';
import { UserController } from './controllers/user.controller';
import { MediaController } from './controllers/media.controller';
import { UserModule } from '@app/db-mongoose/user/user.module';
import { MediaModule } from '@app/db-mongoose/media/media.module';
import { AuthenticateModule } from '@app/authenticate';
import { JwtValidateMiddleware } from './middlewares/jwt-validate.middleware';
import { AdminMiddleware } from './middlewares/admin-validate.middleware';
import { RegularMiddleware } from './middlewares/regular-validate.middleware';
import { SwapiController } from './controllers/swapi.controller';

@Module({
  imports: [
    AuthenticateModule.forRoot({jtwSecret: AppConfig.jwt.secret}),
    DbMongooseModule.forRoot(AppConfig.database.url),
    UserModule,
    MediaModule,
    SwapiModule.forRoot({baseURL: AppConfig.swapi.baseUrl})
  ],
  controllers: [
    AppController, 
    UserController,
    MediaController,
    SwapiController
  ],
  providers: [
    AppService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidateMiddleware).forRoutes('/media', '/media/*');

    consumer.apply(RegularMiddleware).forRoutes(
      {path: '/media', method: RequestMethod.GET},
      {path: '/media/*', method: RequestMethod.GET}
    );

    consumer.apply(AdminMiddleware).forRoutes(
      {path: '/media/*', method: RequestMethod.PATCH},
      {path: '/media/*', method: RequestMethod.DELETE},
      {path: '/media', method: RequestMethod.POST},
      {path: '/media/*', method: RequestMethod.POST}
    );
  }
}