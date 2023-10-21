import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthenticateOption } from './authenticate.options';
import { User } from './authenticate.interface';

@Injectable()
export class AuthenticateService {
    constructor(private readonly options: AuthenticateOption) { }

    async authenticate(user: User, email: string, password: string): Promise<string> {
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.email != email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateJwtToken(user);

        return token;
    }

    async decodeJwtToken(token: string): Promise<User> {
        try {
            return jwt.verify(token, this.options.jtwSecret);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private generateJwtToken(user: User): string {
        const payload = {
            sub: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
    }
}
