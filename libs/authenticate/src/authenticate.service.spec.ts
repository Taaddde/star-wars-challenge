// authenticate.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateOption } from './authenticate.options';
import { IUser } from './authenticate.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@app/db-mongoose/user/user.entity';

// Mocks
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthenticateService', () => {
  let authService: AuthenticateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateService,
        {
          provide: AuthenticateOption,
          useValue: new AuthenticateOption({jtwSecret: 'your-secret-key'}),
        },
      ],
    }).compile();

    authService = module.get<AuthenticateService>(AuthenticateService);
  });

  describe('authenticate', () => {
    const mockUser: IUser = {
      username: 'testuser',
      email: 'test@example.com',
      role: UserRole.Regular,
      password: 'hashedPassword',
    };

    it('should throw NotFoundException when user is not found', async () => {
      // Arrange
      const username = 'nonexistentuser';
      const password = 'somepassword';

      // Act and Assert
      await expect(authService.authenticate(null, username, password)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException when username is incorrect', async () => {
      // Arrange
      const username = 'incorrectusername';
      const password = 'somepassword';

      // Act and Assert
      await expect(authService.authenticate(mockUser, username, password)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'incorrectpassword';

      // Mock bcrypt.compare to return false
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act and Assert
      await expect(authService.authenticate(mockUser, username, password)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should return a valid JWT token when credentials are correct', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'correctpassword';

      // Mock bcrypt.compare to return true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      // Mock jwt.sign to return a token
      (jwt.sign as jest.Mock).mockReturnValue('valid-jwt-token');

      // Act
      const result = await authService.authenticate(mockUser, username, password);

      // Assert
      expect(result).toBe('valid-jwt-token');
    });
  });

  describe('decodeJwtToken', () => {
    const validToken = 'valid-jwt-token';
    const invalidToken = 'invalid-jwt-token';

    it('should return user when token is valid', async () => {
      // Mock jwt.verify to return a user object
      (jwt.verify as jest.Mock).mockReturnValue({ username: 'testuser', role: 'user' });

      // Act
      const result = await authService.decodeJwtToken(validToken);

      // Assert
      expect(result).toEqual({ username: 'testuser', role: 'user' });
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      // Mock jwt.verify to throw an error
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act and Assert
      await expect(authService.decodeJwtToken(invalidToken)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('generateJwtToken', () => {
    const mockUser: IUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
      role: UserRole.Admin,
    };

    it('should generate a valid JWT token', () => {
      (jwt.sign as jest.Mock).mockReturnValue('valid-jwt-token');

      const result = authService.generateJwtToken(mockUser);

      expect(result).toBe('valid-jwt-token');
    });
  });
});
