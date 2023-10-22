import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors, Version } from '@nestjs/common';
import { MediaService } from '@app/db-mongoose/media/media.service';
import { CreateMediaDto, MediaDetailResponseDto, MediaGenericResponseDto, MediaResponseDto } from 'src/dtos/media.dto';
import { ValidationInterceptor } from 'src/interceptors/class-validator.interceptor';
import { Media } from '@app/db-mongoose/media/media.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @Version(['1'])
  @UseInterceptors(ValidationInterceptor)
  createMedia(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaService.create(createMediaDto);
  }

  @Patch(':id')
  @Version(['1'])
  async updateMedia(
    @Param('id') id: string,
    @Body() updateMediaDto: Partial<Media>
  ): Promise<MediaGenericResponseDto> {
    return await this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  @Version(['1'])
  async deleteMedia(
    @Param('id') id: string,
  ): Promise<MediaGenericResponseDto> {
    return await this.mediaService.remove(id);
  }

  @Get()
  async getMediaList(
    @Query('releaseFrom') from: Date,
    @Query('releaseTo') to: Date,
  ): Promise<MediaResponseDto[]> {
    const mediaList = await this.mediaService.findAll();
    return mediaList.map((media) => new MediaResponseDto(media));
  }

  @Get(':id')
  async getMovieDetails(
    @Param('id') id: string,
  ): Promise<MediaDetailResponseDto> {
    const movieDetails = await this.mediaService.findOneById(id);
    return new MediaDetailResponseDto(movieDetails);
  }
}
