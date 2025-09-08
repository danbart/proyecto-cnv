import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TypeRoles } from 'src/common/utils/consts';
import { CatalogoService } from './catalogo.service';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';
import { CatalogoType } from './entities/catalogo-type.enum';
import { Catalogo } from './entities/catalogo.entity';

@ApiTags('Catálogos')
@ApiBearerAuth()
@Controller('catalogos')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) { }

  @Post()
  @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
  @ApiOperation({ summary: 'Crear elemento de catálogo' })
  create(@Body() createCatalogoDto: CreateCatalogoDto) {
    return this.catalogoService.create(createCatalogoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos los catálogos activos' })
  @ApiOkResponse({ type: Catalogo, isArray: true })
  findAll(@Query('tipo') tipo?: CatalogoType) {
    return this.catalogoService.list(tipo);
  }

  @Patch(':id')
  @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
  @ApiOperation({ summary: 'Actualizar elemento de catálogo' })
  update(@Param('id') id: string, @Body() dto: UpdateCatalogoDto) {
    return this.catalogoService.update(id, dto);
  }

  @Delete(':id')
  @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
  @ApiOperation({ summary: 'Eliminar elemento de catálogo' })
  remove(@Param('id') id: string) {
    return this.catalogoService.remove(id);
  }
}
