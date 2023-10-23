import { Controller, Post, Version } from '@nestjs/common';
import { SwapiService } from '@app/swapi';
import { SwapiFilmFormattedDto } from '../dtos/swapi.dto';
import { FilmService } from '@app/db-mongoose/film/film.service';

@Controller('swapi')
export class SwapiController {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly filmService: FilmService,
  ) {}

  @Post()
  @Version(['1'])
  async populateDatabase(): Promise<any> {
    const films = await this.swapiService.getFilms();
    const formattedFilms = films.map((film) => new SwapiFilmFormattedDto(film));
    return this.filmService.createAll(formattedFilms);
  }
}
