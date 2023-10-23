import { Film } from './film.entity';

export interface IListOptions {
  page?: string;
  limit?: string;
}

export interface IFilmList {
  data: Array<Film>;
  page: number;
  limit: number;
}

export class IGenericResponse {
  message: string;
}