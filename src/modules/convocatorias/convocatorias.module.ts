import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/common/shared.module';
import { CatalogoModule } from '../catalogo/catalogo.module';
import { AprobacionesController } from './aprobaciones/aprobaciones.controller';
import { AprobacionesService } from './aprobaciones/aprobaciones.service';
import { ComunicacionController } from './comunicacion/comunicacion.controller';
import { ComunicacionService } from './comunicacion/comunicacion.service';
import { ConvocatoriasController } from './convocatorias.controller';
import { ConvocatoriasService } from './convocatorias.service';
import { Comunicacion, ComunicacionLog, Convocatoria, ConvocatoriaLog, Inscripcion } from './entities';
import { InscripcionesController } from './inscripciones/inscripciones.controller';
import { InscripcionesService } from './inscripciones/inscripciones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Convocatoria, ConvocatoriaLog, Inscripcion, Comunicacion, ComunicacionLog]),
    SharedModule,
    CatalogoModule],
  controllers: [
    ConvocatoriasController,
    AprobacionesController,
    InscripcionesController,
    ComunicacionController],
  providers: [
    ConvocatoriasService,
    AprobacionesService,
    InscripcionesService,
    ComunicacionService,
  ],
})
export class ConvocatoriasModule { }
