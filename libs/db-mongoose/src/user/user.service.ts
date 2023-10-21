import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(userId: string, updateUserDto: Partial<User>): Promise<User | null> {
    const existingUser = await this.findOneById(userId);

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    Object.assign(existingUser, updateUserDto);

    existingUser.updatedAt = new Date();

    return this.userModel.findByIdAndUpdate(userId, existingUser);
  }

  async remove(userId: string): Promise<User | null> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
    return deletedUser;
  }
}
