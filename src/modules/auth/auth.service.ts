import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { email },
            select: ['email', 'password', 'id']
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return user;
    }

    async generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.roles };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_EXPIRES || '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
        });
        await this.updateRefreshToken(user.id, refreshToken);
        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        const hashed = refreshToken ? await bcrypt.hash(refreshToken, 10) : null;
        await this.userRepo.update(userId, { refreshToken: hashed || '' });
    }

    async refresh(userId: string, token: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user || !user.refreshToken) throw new UnauthorizedException('Token inválido');

        const isValid = await bcrypt.compare(token, user.refreshToken);
        if (!isValid) throw new UnauthorizedException('Token inválido');

        return this.generateTokens(user);
    }

    async register(data) {
        const existing = await this.userRepo.findOne({ where: { email: data.email } });
        if (existing) {
            throw new ConflictException('El email ya está registrado');
        }
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }
}
