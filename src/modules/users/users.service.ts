import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { IsNull, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const existing = await this.userRepo.findOne({ where: { email: createUserDto.email } });
        if (existing) {
            throw new ConflictException('El email ya está registrado');
        }
        const user = this.userRepo.create(createUserDto);
        this.userRepo.save(user);
        const { password, ...userData } = user;
        return userData;
    }

    async findAll() {
        const users = await this.userRepo.find({ where: { deletedAt: IsNull() } });
        return users;//.map(user => instanceToPlain(user));
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return instanceToPlain(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        Object.assign(user, updateUserDto);
        return this.userRepo.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return this.userRepo.softRemove(user);
    }
}

