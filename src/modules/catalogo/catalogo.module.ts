import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoController } from './catalogo.controller';
import { CatalogoService } from './catalogo.service';
import { Catalogo } from './entities/catalogo.entity';

@Module({
  controllers: [CatalogoController],
  providers: [CatalogoService],
  exports: [CatalogoService],
  imports: [
    TypeOrmModule.forFeature([Catalogo])
  ]
})
export class CatalogoModule { }
