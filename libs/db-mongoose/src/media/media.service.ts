import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './media.entity';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>) {}

  async create(createMediaDto: Partial<Media>): Promise<Media> {
    const createdMedia = new this.mediaModel(createMediaDto);
    return createdMedia.save();
  }

  async findAll(): Promise<Media[]> {
    return this.mediaModel.find().exec();
  }

  async findOneById(id: string): Promise<Media | null> {
    return this.mediaModel.findById(id).exec();
  }

  async update(id: string, updateMediaDto: Partial<Media>): Promise<Media | null> {
    return this.mediaModel.findByIdAndUpdate(id, updateMediaDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Media | null> {
    return this.mediaModel.findByIdAndDelete(id).exec();
  }
}
