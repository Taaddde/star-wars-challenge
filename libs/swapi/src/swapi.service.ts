import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SwapiOption } from './swapi.options';
import { SwapiFilm } from './swapi.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SwapiService {
    constructor(private readonly httpService: HttpService, private readonly options: SwapiOption) { }

    async getFilms(): Promise<SwapiFilm[]> {
        try {
            const films = await this.httpService.get(`${this.options.baseURL}films`);
            const totalFilms = await lastValueFrom(films);
            return totalFilms?.data?.results;
        } catch (error) {
            throw new ServiceUnavailableException('Swapi service is unavailable');
        }
    }
}
