import { UserRole } from '@app/db-mongoose/user/user.entity';

export class AuthenticateServiceMock {
  async authenticate(username: string): Promise<string> {
    if (username === 'valid-user') {
      return 'valid-token';
    } else {
      return 'invalid-token';
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
