import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PublicarDto, RevisarConvocatoriaDto } from '../dto/logs-convocatoria-dto';
import { Convocatoria, ConvocatoriaEstado } from '../entities/convocatoria.entity';

@Injectable()
export class AprobacionesService {
    logRepo: any;

    constructor(
        @InjectRepository(Convocatoria)
        private readonly conv: Repository<Convocatoria>,
    ) { }
    async enviarRevision(id: string, user: User) {
        const c = await this.conv.findOneByOrFail({ id });
        this.ensure(c, ConvocatoriaEstado.BORRADOR);

        return this.transition(c, user,
            ConvocatoriaEstado.EN_REVISION, 'Enviado a revisión');
    }

    async revisar(id: string, dto: RevisarConvocatoriaDto, jefe: User) {
        const c = await this.conv.findOneByOrFail({ id });
        this.ensure(c, ConvocatoriaEstado.EN_REVISION);

        return this.transition(c, jefe, dto.nuevoEstado, dto.comentario);
    }

    async publicar(id: string, dto: PublicarDto, pub: User) {
        const c = await this.conv.findOneByOrFail({ id });
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
