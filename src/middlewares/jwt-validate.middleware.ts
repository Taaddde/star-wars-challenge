import { AuthenticateService } from '@app/authenticate';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtValidateMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthenticateService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = await this.authService.decodeJwtToken(token);
        req['user'] = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Token not provided' });
    }
  }
}
