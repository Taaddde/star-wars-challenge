import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { UserGenericResponseDto } from 'src/dtos/user.dto';
import { IListOptions, UserList } from './user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(user: User): Promise<UserGenericResponseDto> {
    const existingUser = await this.findOneByUsername(user.username);

    if (existingUser) {
      throw new BadRequestException(
        `The username ${user.username} already exists`,
      );
    }

    const createdUser = new this.userModel(user);
    await createdUser.save();
    return { message: 'User successfully created' };
  }

  async findAll(options: IListOptions): Promise<UserList> {
    const page = parseInt(options.page, 10) || 0;
    const limit = parseInt(options.limit, 10) || 10;
    const skip = page * limit;

    const userList = await this.userModel.find().skip(skip).limit(limit).exec();

    return {
      data: userList,
      page,
      limit,
    };
  }

  async findOneById(userId: string): Promise<User | null> {
    try {
      return await this.userModel.findById(userId).exec();
    } catch (error) {
      return null;
    }
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(
    userId: string,
    updateUserDto: Partial<User>,
  ): Promise<UserGenericResponseDto> {
    const existingUser = await this.findOneById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    Object.assign(existingUser, updateUserDto);

    existingUser.updatedAt = new Date();

    await this.userModel.findByIdAndUpdate(userId, existingUser);

    return { message: 'User successfully updated' };
  }

  async remove(userId: string): Promise<UserGenericResponseDto> {
    await this.userModel.findByIdAndDelete(userId).exec();
    return { message: 'User successfully removed' };
  }
}
