import { OmitType } from '@nestjs/mapped-types';
import { User } from '@app/db-mongoose/user/user.entity';

export class CreateUserDto extends OmitType(User, ['createdAt', 'updatedAt'] as const) {}
