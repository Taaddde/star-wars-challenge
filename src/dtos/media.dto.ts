import { OmitType } from '@nestjs/mapped-types';
import { Media } from '@app/db-mongoose/media/media.entity';

export class CreateMediaDto extends OmitType(Media, [
  '_id',
  'createdAt',
  'updatedAt',
] as const) {}

export class MediaListDto {
  data: Array<Media>;
  page: number;
  limit: number;
}

export class MediaDetailResponseDto {
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

export class MediaResponseDto {
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

export class MediaGenericResponseDto {
  message: string;
}
