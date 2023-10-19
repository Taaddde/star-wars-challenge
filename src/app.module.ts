import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbMongooseModule } from '@app/db-mongoose';
import { AppConfig } from './app.config';

@Module({
  imports: [DbMongooseModule.forRoot(AppConfig.databaseUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
