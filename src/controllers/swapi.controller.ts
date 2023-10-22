import { Controller, Post, Version } from '@nestjs/common';
import { SwapiService } from '@app/swapi';
import { SwapiFilmFormattedDto } from 'src/dtos/swapi.dto';
import { MediaService } from '@app/db-mongoose/media/media.service';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService, private readonly mediaService: MediaService) {}

  @Post()
  @Version(['1'])
  async populateDatabase(): Promise<any> {
    const films = await this.swapiService.getFilms();
    const formattedFilms = films.map((film) => new SwapiFilmFormattedDto(film));
    return this.mediaService.createAll(formattedFilms); 
  }
}
