import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';
import { CatalogoType } from './entities/catalogo-type.enum';
import { Catalogo } from './entities/catalogo.entity';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Catalogo)
    private repo: Repository<Catalogo>,
  ) { }

  list(tipo?: CatalogoType) {
    return this.repo.find({
      where: tipo ? { tipo, activo: true } : { activo: true },
      order: { nombre: 'ASC' },
    });
  }

  create(dto: CreateCatalogoDto) {
    return this.repo.save(dto);
  }

  update(id: string, dto: UpdateCatalogoDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
