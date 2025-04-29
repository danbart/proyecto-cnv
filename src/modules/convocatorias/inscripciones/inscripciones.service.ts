import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { CambiarEstadoDto, CreateInscripcionDto } from "../dto/create-inscripcion.dto";
import { Convocatoria } from "../entities/convocatoria.entity";
import { InscripcionEstado } from "../entities/inscripcion-estado.enum";
import { Inscripcion } from "../entities/inscripcion.entity";

@Injectable()
export class InscripcionesService {
    constructor(
        @InjectRepository(Inscripcion) private repo: Repository<Inscripcion>,
        @InjectRepository(Convocatoria) private convRepo: Repository<Convocatoria>,
    ) { }

    async crear(convId: string, dto: CreateInscripcionDto) {
        const conv = await this.convRepo.findOneByOrFail({ id: convId });

        // ① verificar índice y cupo
        if (dto.indiceFecha >= conv.fechas.length) {
            throw new BadRequestException('Índice de fecha inválido');
        }
        const inscritosEnFecha = await this.repo.count({
            where: { convocatoria: { id: convId }, indiceFecha: dto.indiceFecha, estado: In([InscripcionEstado.PENDIENTE, InscripcionEstado.APROBADA]) },
        });
        if (inscritosEnFecha >= conv.cupo) {
            dto = { ...dto };                       // copia para no mutar arg
            return this.repo.save(this.repo.create({
                ...dto,
                estado: InscripcionEstado.LISTA_ESPERA,
                convocatoria: conv,
            }));
        }

        // ② guardar como pendiente
        return this.repo.save(this.repo.create({ ...dto, convocatoria: conv }));
    }

    async listar(convId: string) {
        return this.repo.find({
            where: { convocatoria: { id: convId } },
            order: { createdAt: 'ASC' },
        });
    }

    async cambiarEstado(id: string, dto: CambiarEstadoDto, user: User) {
        const ins = await this.repo.findOneByOrFail({ id });
        ins.estado = dto.nuevoEstado;
        ins.nota = dto.nota;
        ins.updatedAt = new Date();
        await this.repo.save(ins);

        // TODO: notificar participante (SES)
        return ins;
    }
}
