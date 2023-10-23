import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmModule } from './film/film.module';
import { UserModule } from './user/user.module';

@Module({})
export class DbMongooseModule {
  static forRoot(mongoUri: string): DynamicModule {
    return {
      module: DbMongooseModule,
      imports: [MongooseModule.forRoot(mongoUri), FilmModule, UserModule],
    };
  }
}
