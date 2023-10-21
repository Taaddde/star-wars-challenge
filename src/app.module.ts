import { Module } from '@nestjs/common';
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
export class AppModule {}
