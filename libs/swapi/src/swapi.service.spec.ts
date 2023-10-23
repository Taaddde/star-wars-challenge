import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, HttpModule } from '@nestjs/axios';
import { SwapiService } from './swapi.service';
import { SwapiOption } from './swapi.options';
import { ServiceUnavailableException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        SwapiService,
        {
          provide: SwapiOption,
          useValue: {
            baseURL: 'https://swapi.dev/api/',
          },
        },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFilms', () => {
    it('should return films', async () => {
      const filmsData = {
        data: {
          results: [
            { title: 'Film 1' },
            { title: 'Film 2' },
          ],
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(filmsData as any));

      const result = await service.getFilms();

      expect(result).toEqual(filmsData.data.results);
    });

    it('should throw ServiceUnavailableException if Swapi service is unavailable', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(throwError(new Error('Service Unavailable')));

      await expect(service.getFilms()).rejects.toThrowError(ServiceUnavailableException);
    });
  });
});
