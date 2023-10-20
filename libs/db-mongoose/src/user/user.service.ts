import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJwtToken(user);

    return token;
  }

  async validateJwtToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await this.userModel.findById(decoded.sub).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private generateJwtToken(user: User): string {
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
  }

  async create(user: User): Promise<User> {
    console.log(user)
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
