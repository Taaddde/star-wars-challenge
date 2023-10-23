import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Media, MediaDocument } from './media.entity';
import { MediaGenericResponseDto } from 'src/dtos/media.dto';
import { IListOptions, MediaList } from './media.interface';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
  ) {}

  async create(
    createMediaDto: Partial<Media>,
  ): Promise<MediaGenericResponseDto> {
    const createdMedia = new this.mediaModel(createMediaDto);
    await createdMedia.save();
    return { message: 'Media successfully created' };
  }

  async createAll(medias): Promise<string> {
    await this.mediaModel.create(medias);
    return 'Films successfully created';
  }

  async findAll(options: IListOptions): Promise<MediaList> {
    const page = parseInt(options.page, 10) || 0;
    const limit = parseInt(options.limit, 10) || 10;
    const skip = page * limit;

    const userList = await this.mediaModel
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

  async findOneById(id: string): Promise<Media | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of media invalid' });
    }
    try {
      return this.mediaModel.findById(new Types.ObjectId(id)).exec();
    } catch (error) {
      return null;
    }
  }

  async update(
    id: string,
    updateMediaDto: Partial<Media>,
  ): Promise<MediaGenericResponseDto | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of media invalid' });
    }
    try {
      await this.mediaModel
        .findByIdAndUpdate(new Types.ObjectId(id), updateMediaDto)
        .exec();
      return { message: 'Media successfully updated' };
    } catch (error) {
      throw new BadRequestException({ message: 'Data to update is invalid' });
    }
  }

  async remove(id: string): Promise<MediaGenericResponseDto | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({ message: 'ID of media invalid' });
    }

    try {
      await this.mediaModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return { message: 'Media successfully removed' };
    } catch (error) {
      throw new BadRequestException({
        message: 'Something be wrong to delete the media',
      });
    }
  }
}
