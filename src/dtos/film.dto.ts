import { OmitType } from '@nestjs/mapped-types';
import { Film } from '@app/db-mongoose/film/film.entity';

export class CreateFilmDto extends OmitType(Film, [
  '_id',
  'createdAt',
  'updatedAt',
] as const) {}

export class FilmListDto {
  data: Array<Film>;
  page: number;
  limit: number;
}

export class FilmDetailResponseDto {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  director: string;
  producer: string;
  characters: string;

  constructor(data) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.releaseDate = data.releaseDate;
    this.director = data.director;
    this.producer = data.producer;
    this.characters = data.characters;
  }
}

export class FilmResponseDto {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;

  constructor(data) {
    this._id = data?._id;
    this.title = data.title;
    this.description = data.description;
    this.releaseDate = data.releaseDate;
  }
}

export class FilmGenericResponseDto {
  message: string;
}
