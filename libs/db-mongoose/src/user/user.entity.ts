import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  Regular = 'regular',
  Admin = 'admin',
}
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: null })
  lastLogin: Date;

  @Prop({ type: String, enum: UserRole, default: UserRole.Regular })
  role: UserRole;

  @Prop({ default: null })
  profileImage: string;

  @Prop({ default: now() })
  createdAt?: Date;

  @Prop({ default: now() })
  updatedAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});
