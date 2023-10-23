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
import { MediaService } from '@app/db-mongoose/media/media.service';
import {
  CreateMediaDto,
  MediaDetailResponseDto,
  MediaGenericResponseDto,
  MediaListDto,
} from '../dtos/media.dto';
import { ValidationInterceptor } from '../interceptors/class-validator.interceptor';
import { Media } from '@app/db-mongoose/media/media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Version(['1'])
  @HttpCode(201)
  @UseInterceptors(ValidationInterceptor)
  createMedia(
    @Body() createMediaDto: CreateMediaDto,
  ): Promise<MediaGenericResponseDto> {
    return this.mediaService.create(createMediaDto);
  }

  @Patch(':id')
  @Version(['1'])
  @HttpCode(200)
  async updateMedia(
    @Param('id') id: string,
    @Body() updateMediaDto: Partial<Media>,
  ): Promise<MediaGenericResponseDto> {
    return await this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  @Version(['1'])
  @HttpCode(200)
  async deleteMedia(@Param('id') id: string): Promise<MediaGenericResponseDto> {
    return await this.mediaService.remove(id);
  }

  @Get()
  @HttpCode(200)
  async getMediaList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<MediaListDto> {
    return await this.mediaService.findAll({ page, limit });
  }

  @Get(':id')
  @HttpCode(200)
  async getMovieDetails(
    @Param('id') id: string,
  ): Promise<MediaDetailResponseDto> {
    const movieDetails = await this.mediaService.findOneById(id);
    return new MediaDetailResponseDto(movieDetails);
  }
}
