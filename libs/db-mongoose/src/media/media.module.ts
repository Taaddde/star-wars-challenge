import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './media.entity';
import { MediaService } from './media.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
