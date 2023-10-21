import { OmitType, PickType } from '@nestjs/mapped-types';
import { User } from '@app/db-mongoose/user/user.entity';

export class CreateUserDto extends OmitType(User, ['createdAt', 'updatedAt'] as const) { }
export class LoginUserDto extends PickType(User, ['username', 'password'] as const) { }

export class LoginResponseDto {
    username: string;
    email: string;
    role: string;
    token: string;

    constructor(data: Partial<LoginResponseDto>, token) {
        this.username = data.username;
        this.email = data.email;
        this.username = data.username;
        this.role = data.role;
        this.token = token;
    }
}

export class UserResponseDto {
    _id: string;
    username: string;
    email: string;
    role: string;

    constructor(data) {
        this._id = data._id;
        this.username = data.username;
        this.email = data.email;
        this.username = data.username;
        this.role = data.role;
    }
}
