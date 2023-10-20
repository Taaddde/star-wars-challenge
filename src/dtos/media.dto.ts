import { OmitType } from '@nestjs/mapped-types';
import { Media } from '@app/db-mongoose/media/media.entity';

export class CreateUserDto extends OmitType(Media, ['_id', 'createdAt', 'updatedAt'] as const) {}
