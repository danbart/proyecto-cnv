import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConvocatoriaEstado } from 'src/common/enums/convocatoria-estado.enum';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateConvocatoriaDto } from './dto/create-convocatoria.dto';
import { UpdateConvocatoriaDto } from './dto/update-convocatoria.dto';
import { Convocatoria } from './entities/convocatoria.entity';

@Injectable()
export class ConvocatoriasService {
    constructor(
        @InjectRepository(Convocatoria)
        private readonly repo: Repository<Convocatoria>,
    ) { }

    async create(dto: CreateConvocatoriaDto, currentUser: User) {
        const entity = this.repo.create({ ...dto, estado: ConvocatoriaEstado.BORRADOR, createdBy: currentUser });
        return this.repo.save(entity);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: string) {
        const conv = await this.repo.findOne({ where: { id } });
        if (!conv) throw new NotFoundException('Convocatoria no encontrada');
        return conv;
    }

    async update(id: string, dto: UpdateConvocatoriaDto, currentUser: User) {
        const conv = await this.findOne(id);
        Object.assign(conv, dto);
        conv.updatedBy = currentUser;
        return this.repo.save(conv);
    }

    async remove(id: string) {
        await this.repo.softDelete(id);
    }

    // Ejemplo de método de cambio de estado/flujo
    async aprobar(id: string, currentUser: User) {
        const conv = await this.findOne(id);
        conv.estado = ConvocatoriaEstado.APROBADA;
        conv.updatedBy = currentUser;
        return this.repo.save(conv);
    }
}