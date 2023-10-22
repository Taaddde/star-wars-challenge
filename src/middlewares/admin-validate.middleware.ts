import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = req['user'];

        if (user) {
            if (user.role === 'admin') {
                next();
            } else {
                res.status(403).json({ message: "Resources only available for admin users"});
            }
        } else {
            res.status(403).json({ message: 'Token not provided or invalid' });
        }
    }
}
