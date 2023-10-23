import { Film } from '@app/db-mongoose/film/film.entity';
import { IFilmList, IGenericResponse } from '@app/db-mongoose/film/film.interface';
import { FilmGenericResponseDto } from 'src/dtos/film.dto';
import { Types } from 'mongoose';

export class FilmServiceMock {
  async create(): Promise<Film> {
    return {
      _id: null,
      title: 'Batman',
      description: 'Es una historia muy conmovedora',
      releaseDate: new Date('2023-10-22T05:34:43.800Z'),
      director: 'Tadeo',
      producer: 'Tadeo',
      characters: ['Batman', 'Guason'],
      createdAt: new Date('2023-10-22T05:34:43.800Z'),
      updatedAt: new Date('2023-10-22T05:34:43.800Z'),
    };
  }

  async createAll(): Promise<string> {
    return 'Films successfully created';
  }

  async findAll(): Promise<IFilmList> {
    return {
      data: [
        {
          _id: new Types.ObjectId('6536775dedcbb131fa9bca1f'),
          title: 'A New Hope',
          description:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          releaseDate: new Date('1977-05-25T00:00:00.000Z'),
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          characters: [
            'https://swapi.dev/api/people/1/',
            'https://swapi.dev/api/people/2/',
            'https://swapi.dev/api/people/3/',
            'https://swapi.dev/api/people/4/',
            'https://swapi.dev/api/people/5/',
            'https://swapi.dev/api/people/6/',
            'https://swapi.dev/api/people/7/',
            'https://swapi.dev/api/people/8/',
            'https://swapi.dev/api/people/9/',
            'https://swapi.dev/api/people/10/',
            'https://swapi.dev/api/people/12/',
            'https://swapi.dev/api/people/13/',
            'https://swapi.dev/api/people/14/',
            'https://swapi.dev/api/people/15/',
            'https://swapi.dev/api/people/16/',
            'https://swapi.dev/api/people/18/',
            'https://swapi.dev/api/people/19/',
            'https://swapi.dev/api/people/81/',
          ],
          createdAt: new Date('1977-05-25T00:00:00.000Z'),
          updatedAt: new Date('1977-05-25T00:00:00.000Z'),
        },
        {
          _id: new Types.ObjectId('6536775dedcbb131fa9bca1f'),
          title: 'The Empire Strikes Back',
          description:
            'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
          releaseDate: new Date('1977-05-25T00:00:00.000Z'),
          director: 'Irvin Kershner',
          producer: 'Gary Kurtz, Rick McCallum',
          characters: [
            'https://swapi.dev/api/people/1/',
            'https://swapi.dev/api/people/2/',
            'https://swapi.dev/api/people/3/',
            'https://swapi.dev/api/people/4/',
            'https://swapi.dev/api/people/5/',
            'https://swapi.dev/api/people/10/',
            'https://swapi.dev/api/people/13/',
            'https://swapi.dev/api/people/14/',
            'https://swapi.dev/api/people/18/',
            'https://swapi.dev/api/people/20/',
            'https://swapi.dev/api/people/21/',
            'https://swapi.dev/api/people/22/',
            'https://swapi.dev/api/people/23/',
            'https://swapi.dev/api/people/24/',
            'https://swapi.dev/api/people/25/',
            'https://swapi.dev/api/people/26/',
          ],
          createdAt: new Date('1977-05-25T00:00:00.000Z'),
          updatedAt: new Date('1977-05-25T00:00:00.000Z'),
        },
      ],
      page: 0,
      limit: 10,
    };
  }

  async findOneById(): Promise<Film | null> {
    return {
      _id: null,
      title: 'Batman',
      description: 'Es una historia muy conmovedora',
      releaseDate: new Date('2023-10-22T05:34:43.800Z'),
      director: 'Tadeo',
      producer: 'Tadeo',
      characters: ['Batman', 'Guason'],
      createdAt: new Date('2023-10-22T05:34:43.800Z'),
      updatedAt: new Date('2023-10-22T05:34:43.800Z'),
    };
  }

  async update(): Promise<IGenericResponse | null> {
    return { message: 'Film successfully updated' };
  }

  async remove(): Promise<IGenericResponse | null> {
    return { message: 'Film successfully removed' };
  }
}
