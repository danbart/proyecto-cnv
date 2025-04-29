import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConvocatoriaEstado } from 'src/common/enums/convocatoria-estado.enum';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PublicarDto, RevisarConvocatoriaDto } from '../dto/logs-convocatoria.dto';
import { Convocatoria, ConvocatoriaLog } from '../entities';

@Injectable()
export class AprobacionesService {

    constructor(
        @InjectRepository(Convocatoria)
        private readonly conv: Repository<Convocatoria>,
        @InjectRepository(ConvocatoriaLog)
        private readonly logRepo: Repository<ConvocatoriaLog>,
    ) { }
    async enviarRevision(id: string, user: User) {
        const c = await this.conv.findOne({
            where: { id },
            withDeleted: false,            // true si permites reactivar borrados
        });
        if (!c) throw new NotFoundException('Convocatoria no encontrada');
        this.ensure(c, ConvocatoriaEstado.BORRADOR);

        return this.transition(c, user,
            ConvocatoriaEstado.EN_REVISION, 'Enviado a revisión');
    }

    async revisar(id: string, dto: RevisarConvocatoriaDto, jefe: User) {
        const c = await this.conv.findOne({
            where: { id },
            withDeleted: false,            // true si permites reactivar borrados
        });
        if (!c) throw new NotFoundException('Convocatoria no encontrada');
        this.ensure(c, ConvocatoriaEstado.EN_REVISION);

        return this.transition(c, jefe, dto.nuevoEstado, dto.comentario);
    }

    async publicar(id: string, dto: PublicarDto, pub: User) {
        const c = await this.conv.findOne({
            where: { id },
            withDeleted: false,            // true si permites reactivar borrados
        });
        if (!c) throw new NotFoundException('Convocatoria no encontrada');
        this.ensure(c, ConvocatoriaEstado.APROBADA);

        return this.transition(c, pub, ConvocatoriaEstado.PUBLICADA, dto.nota);
    }

    /* helpers */
    private ensure(c: Convocatoria, esperado: ConvocatoriaEstado) {
        if (c.estado !== esperado)
            throw new BadRequestException(`Convocatoria debe estar en ${esperado}`);
    }

    private async transition(
        c: Convocatoria,
        actor: User,
        to: ConvocatoriaEstado,
        nota?: string,
    ) {
        const from = c.estado;
        c.estado = to;
        c.updatedBy = actor;

        await this.conv.save(c);
        await this.logRepo.save({ convocatoria: c, actor, de: from, a: to, nota });

        // TODO notificaciones SES aquí
        return c;
    }
}
