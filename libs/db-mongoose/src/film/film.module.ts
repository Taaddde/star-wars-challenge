import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.entity';
import { FilmService } from './film.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
