import { SwapiFilm } from '@app/swapi/swapi.dto';

export class SwapiFilmFormattedDto {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  director: string;
  producer: string;
  characters: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: SwapiFilm) {
    this.title = data.title;
    this.description = data.opening_crawl;
    this.releaseDate = data.release_date;
    this.director = data.director;
    this.producer = data.producer;
    this.characters = data.characters;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
