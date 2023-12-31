import { UserRole } from '@app/db-mongoose/user/user.entity';
import { UnauthorizedException } from '@nestjs/common';

export class AuthenticateServiceMock {
  async authenticate(_user, username: string): Promise<string> {
    if (username === 'valid-user') {
      return 'valid-token';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async decodeJwtToken(token: string): Promise<any> {
    if (token === 'admin-token') {
      return {
        username: 'valid-user',
        email: 'klark_kent@hotmail.com',
        isActive: true,
        role: UserRole.Admin,
        profileImage: null,
      };
    } else {
      return {
        username: 'valid-user',
        email: 'klark_kent@hotmail.com',
        isActive: true,
        role: UserRole.Regular,
        profileImage: null,
      };
    }
  }
}
