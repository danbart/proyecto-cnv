import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AprobacionesController } from './aprobaciones/aprobaciones.controller';
import { AprobacionesService } from './aprobaciones/aprobaciones.service';
import { ConvocatoriasController } from './convocatorias.controller';
import { ConvocatoriasService } from './convocatorias.service';
import { Convocatoria } from './entities/convocatoria.entity';
import { ConvocatoriaLog } from './entities/convocatoriaLog.entity';
import { Inscripcion } from './entities/inscripcion.entity';
import { InscripcionesController } from './inscripciones/inscripciones.controller';
import { InscripcionesService } from './inscripciones/inscripciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Convocatoria, ConvocatoriaLog, Inscripcion])],
  controllers: [ConvocatoriasController, AprobacionesController, InscripcionesController],
  providers: [ConvocatoriasService, AprobacionesService, InscripcionesService],
})
export class ConvocatoriasModule { }
