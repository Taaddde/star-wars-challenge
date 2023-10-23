import { User, UserRole } from '@app/db-mongoose/user/user.entity';
import { UserList } from '@app/db-mongoose/user/user.interface';
import { BadRequestException } from '@nestjs/common';
import { UserGenericResponseDto } from 'src/dtos/user.dto';

export class UserServiceMock {
  async create(user: User): Promise<UserGenericResponseDto> {
    if (user.username === 'already-exists') {
      throw new BadRequestException('The username batman already exists');
    } else {
      return { message: 'User successfully created' };
    }
  }

  async findAll(): Promise<UserList> {
    return {
      data: [
        {
          username: 'batman',
          email: 'bruce_wayne@hotmail.com',
          password:
            '$2b$10$ZDx/i3i.gouRbIus4bkIjenG/wa/8S7VklrzEWMJ0MeqJa7bY7HWi',
          isActive: true,
          lastLogin: null,
          role: UserRole.Admin,
          profileImage: null,
          createdAt: new Date('2023-10-23T02:39:44.142Z'),
          updatedAt: new Date('2023-10-23T02:39:44.142Z'),
        },
        {
          username: 'superman',
          email: 'klarc_kent@hotmail.com',
          password:
            '$2b$10$YcOBccZzBFnmeSUBdsffqOZhXrhqC1cjzeZkfnrtKuZBtxNiJ8LGG',
          isActive: true,
          lastLogin: null,
          role: UserRole.Regular,
          profileImage: null,
          createdAt: new Date('2023-10-23T02:39:44.142Z'),
          updatedAt: new Date('2023-10-23T02:39:44.142Z'),
        },
      ],
      page: 0,
      limit: 10,
    };
  }

  async findOneById(): Promise<User | null> {
    return {
      username: 'superman',
      email: 'klark_kent@hotmail.com',
      password: '$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq',
      isActive: true,
      lastLogin: null,
      role: UserRole.Admin,
      profileImage: null,
      createdAt: new Date('2023-10-22T05:34:43.800Z'),
      updatedAt: new Date('2023-10-22T05:34:43.800Z'),
    };
  }

  async findOneByUsername(): Promise<User | null> {
    return {
      username: 'valid-user',
      email: 'klark_kent@hotmail.com',
      password: '$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq',
      isActive: true,
      lastLogin: null,
      role: UserRole.Admin,
      profileImage: null,
      createdAt: new Date('2023-10-22T05:34:43.800Z'),
      updatedAt: new Date('2023-10-22T05:34:43.800Z'),
    };
  }

  async update(): Promise<UserGenericResponseDto> {
    return { message: 'User successfully updated' };
  }

  async remove(): Promise<UserGenericResponseDto> {
    return { message: 'User successfully removed' };
  }
}
