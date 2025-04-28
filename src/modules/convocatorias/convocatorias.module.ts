import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AprobacionesController } from './aprobaciones/aprobaciones.controller';
import { AprobacionesService } from './aprobaciones/aprobaciones.service';
import { ConvocatoriasController } from './convocatorias.controller';
import { ConvocatoriasService } from './convocatorias.service';
import { Convocatoria } from './entities/convocatoria.entity';
import { ConvocatoriaLog } from './entities/convocatoriaLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Convocatoria, ConvocatoriaLog])],
  controllers: [ConvocatoriasController, AprobacionesController],
  providers: [ConvocatoriasService, AprobacionesService],
})
export class ConvocatoriasModule { }
