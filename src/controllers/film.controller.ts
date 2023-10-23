import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FilmService } from '@app/db-mongoose/film/film.service';
import {
  CreateFilmDto,
  FilmDetailResponseDto,
  FilmGenericResponseDto,
  FilmListDto,
} from '../dtos/film.dto';
import { ValidationInterceptor } from '../interceptors/class-validator.interceptor';
import { Film } from '@app/db-mongoose/film/film.entity';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post()
  @Version(['1'])
  @HttpCode(201)
  @UseInterceptors(ValidationInterceptor)
  create(
    @Body() createFilmDto: CreateFilmDto,
  ): Promise<FilmGenericResponseDto> {
    return this.filmService.create(createFilmDto);
  }

  @Patch(':id')
  @Version(['1'])
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateFilmDto: Partial<Film>,
  ): Promise<FilmGenericResponseDto> {
    return await this.filmService.update(id, updateFilmDto);
  }

  @Delete(':id')
  @Version(['1'])
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<FilmGenericResponseDto> {
    return await this.filmService.remove(id);
  }

  @Get()
  @HttpCode(200)
  async getList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<FilmListDto> {
    return await this.filmService.findAll({ page, limit });
  }

  @Get(':id')
  @HttpCode(200)
  async getMovieDetails(
    @Param('id') id: string,
  ): Promise<FilmDetailResponseDto> {
    const movieDetails = await this.filmService.findOneById(id);
    return new FilmDetailResponseDto(movieDetails);
  }
}
