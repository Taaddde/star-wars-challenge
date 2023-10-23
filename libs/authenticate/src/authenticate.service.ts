import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthenticateOption } from './authenticate.options';
import { IUser } from './authenticate.interface';

@Injectable()
export class AuthenticateService {
    constructor(private readonly options: AuthenticateOption) { }

    async authenticate(user: IUser, username: string, password: string): Promise<string> {
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.username != username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateJwtToken(user);

        return token;
    }

    async decodeJwtToken(token: string): Promise<IUser> {
        try {
            return jwt.verify(token, this.options.jtwSecret);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private generateJwtToken(user: IUser): string {
        const payload = {
            username: user.username,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, this.options.jtwSecret, { expiresIn: '3h' });
    }
}
