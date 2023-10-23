import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Film, FilmDocument } from './film.entity';
import { IListOptions, IFilmList, IGenericResponse } from './film.interface';

@Injectable()
export class FilmService {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async create(
    createFilmDto: Partial<Film>,
  ): Promise<IGenericResponse> {
    const createdFilm = new this.filmModel(createFilmDto);
    await createdFilm.save();
    return { message: 'Film successfully created' };
  }

  async createAll(Films): Promise<string> {
    await this.filmModel.create(Films);
    return 'Films successfully created';
  }

  async findAll(options: IListOptions): Promise<IFilmList> {
    const page = parseInt(options.page, 10) || 0;
    const limit = parseInt(options.limit, 10) || 10;
    const skip = page * limit;

    const userList = await this.filmModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data: userList,
      page,
      limit,
    };
  }

  async findOneById(id: string): Promise<Film | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of film invalid' });
    }
    try {
      return this.filmModel.findById(new Types.ObjectId(id)).exec();
    } catch (error) {
      return null;
    }
  }

  async update(
    id: string,
    updateFilmDto: Partial<Film>,
  ): Promise<IGenericResponse | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of film invalid' });
    }
    try {
      await this.filmModel
        .findByIdAndUpdate(new Types.ObjectId(id), updateFilmDto)
        .exec();
      return { message: 'Film successfully updated' };
    } catch (error) {
      throw new BadRequestException({ message: 'Data to update is invalid' });
    }
  }

  async remove(id: string): Promise<IGenericResponse | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of film invalid' });
    }

    try {
      await this.filmModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return { message: 'Film successfully removed' };
    } catch (error) {
      throw new BadRequestException({
        message: 'Something be wrong to delete the Film',
      });
    }
  }
}
