import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { QrGeneratorService } from 'src/common/services/qr-generator.service';
import { SesMailerService } from 'src/common/services/ses-mailer.service';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CrearComunicacionDto, ReintentarEnvioDto } from '../dto/crear-comunicacion.dto';
import { Comunicacion, ComunicacionLog, Inscripcion, InscripcionEstado } from '../entities';

@Injectable()
export class ComunicacionService {
    baseUrl = '';
    constructor(
        @InjectRepository(Comunicacion) private repo: Repository<Comunicacion>,
        @InjectRepository(ComunicacionLog) private logRepo: Repository<ComunicacionLog>,
        @InjectRepository(Inscripcion) private insRepo: Repository<Inscripcion>,
        private ses: SesMailerService,
        private qr: QrGeneratorService,           // wrapper de qrcode npm
        private cfg: ConfigService,
    ) {
        this.baseUrl = this.cfg.getOrThrow('APP_PUBLIC_URL');
    }

    async crear(convId: string, dto: CrearComunicacionDto, user: User) {
        const comunicacion = this.repo.create({
            ...dto,
            convocatoria: { id: convId } as any,
        });
        return this.repo.save(comunicacion);
    }

    /** Envío asincrónico – podría moverse a job/queue */
    async enviar(id: string) {
        const c = await this.repo.findOneOrFail({ where: { id }, relations: ['convocatoria'] });

        if (c.enviado) throw new BadRequestException('Ya fue enviada');
        const inscripciones = await this.insRepo.find({
            where: { convocatoria: { id: c.convocatoria.id }, estado: In([InscripcionEstado.APROBADA]) },
        });

        for (const insc of inscripciones) {
            const qrUrl = await this.qr.url(`${this.baseUrl}/conv/${c.convocatoria.id}/${insc.id}`);

            /* Render sencillo */
            const html = c.cuerpoHtml
                .replace(/{{fullName}}/g, `${insc.nombres} ${insc.apellidos}`)
                .replace(/{{qrUrl}}/g, qrUrl);

            try {
                await this.ses.send({
                    to: insc.emailPersonal,
                    subject: c.asunto,
                    html,
                });
                await this.logRepo.save({ comunicacion: c, destinatario: insc.emailPersonal, exito: true });
            } catch (e) {
                await this.logRepo.save({
                    comunicacion: c,
                    destinatario: insc.emailPersonal,
                    exito: false,
                    error: e.message,
                });
                c.totalIntentos += 1;
            }
        }

        c.enviado = true;
        await this.repo.save(c);
        return { enviados: inscripciones.length };
    }

    async reintentar(id: string, dto: ReintentarEnvioDto) {
        const c = await this.repo.findOneOrFail({ where: { id } });
        c.enviado = false;
        c.totalIntentos += dto.intentos;
        await this.repo.save(c);
        return this.enviar(id);
    }

    async getLogs(comunicacionId: string) {
        return this.logRepo.find({
            where: { comunicacion: { id: comunicacionId } },
            order: { enviadoEn: 'ASC' },
        });
    }
}
