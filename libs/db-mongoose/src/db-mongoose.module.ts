import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaModule } from './media/media.module';
import { UserModule } from './user/user.module';

@Module({})
export class DbMongooseModule {
  static forRoot(mongoUri: string): DynamicModule {
    console.log(mongoUri)
    return {
      module: DbMongooseModule,
      imports: [
        MongooseModule.forRoot(mongoUri),
        MediaModule,
        UserModule,
      ],
    };
  }
}
