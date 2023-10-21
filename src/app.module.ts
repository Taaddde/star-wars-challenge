import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
    MediaController
  ],
  providers: [
    AppService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtValidateMiddleware).forRoutes('/media', '/media/*');

    consumer.apply(AdminMiddleware).forRoutes('/media/*');
  }
}