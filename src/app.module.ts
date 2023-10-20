import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DbMongooseModule } from '@app/db-mongoose';
import { AppConfig } from './app.config';
import { SwapiModule } from '@app/swapi';
import { UserController } from './controllers/user.controller';
import { MediaController } from './controllers/media.controller';
import { UserModule } from '@app/db-mongoose/user/user.module';
import { MediaModule } from '@app/db-mongoose/media/media.module';

@Module({
  imports: [
    DbMongooseModule.forRoot(AppConfig.databaseUrl),
    UserModule,
    MediaModule,
    SwapiModule.forRoot({baseURL: AppConfig.swapiBaseUrl})
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
