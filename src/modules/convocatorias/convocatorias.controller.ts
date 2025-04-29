import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TypeRoles } from 'src/common/utils/consts';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ConvocatoriasService } from './convocatorias.service';
import { CreateConvocatoriaDto } from './dto/create-convocatoria.dto';
import { UpdateConvocatoriaDto } from './dto/update-convocatoria.dto';
import { Convocatoria } from './entities/convocatoria.entity';

@ApiTags('Convocatorias')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token JWT inválido o expirado' })
@ApiForbiddenResponse({ description: 'El usuario no tiene permisos para la operación' })
@Controller('convocatorias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConvocatoriasController {
    constructor(private readonly svc: ConvocatoriasService) { }

    // ────────────────────────────────────────────────────────────
    // CREATE
    // ────────────────────────────────────────────────────────────
    @Post()
    @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
    @ApiOperation({ summary: 'Crea una nueva convocatoria en estado BORRADOR' })
    @ApiBody({ type: CreateConvocatoriaDto })
    @ApiCreatedResponse({ type: Convocatoria, description: 'Convocatoria creada' })
    @ApiBadRequestResponse({ description: 'Payload inválido' })
    create(@Body() dto: CreateConvocatoriaDto, @Req() req) {
        return this.svc.create(dto, req.user);
    }

    // ────────────────────────────────────────────────────────────
    // LIST
    // ────────────────────────────────────────────────────────────
    @Get()
    @ApiOperation({ summary: 'Obtiene la lista de convocatorias' })
    @ApiOkResponse({ type: [Convocatoria] })
    findAll() {
        return this.svc.findAll();
    }

    // ────────────────────────────────────────────────────────────
    // DETAIL
    // ────────────────────────────────────────────────────────────
    @Get(':id')
    @ApiParam({ name: 'id', description: 'UUID de la convocatoria' })
    @ApiOperation({ summary: 'Detalle de una convocatoria' })
    @ApiOkResponse({ type: Convocatoria })
    @ApiNotFoundResponse({ description: 'Convocatoria no encontrada' })
    findOne(@Param('id') id: string) {
        return this.svc.findOne(id);
    }

    // ────────────────────────────────────────────────────────────
    // UPDATE
    // ────────────────────────────────────────────────────────────
    @Patch(':id')
    @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
    @ApiParam({ name: 'id' })
    @ApiOperation({ summary: 'Actualiza una convocatoria (BORRADOR o EN_MODIFICACION)' })
    @ApiBody({ type: UpdateConvocatoriaDto })
    @ApiOkResponse({ type: Convocatoria, description: 'Convocatoria actualizada' })
    update(@Param('id') id: string, @Body() dto: UpdateConvocatoriaDto, @Req() req) {
        return this.svc.update(id, dto, req.user);
    }

    // ────────────────────────────────────────────────────────────
    // APPROVE
    // ────────────────────────────────────────────────────────────
    // @Patch(':id/approve')
    // @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
    // @ApiParam({ name: 'id' })
    // @ApiOperation({ summary: 'Aprueba la convocatoria' })
    // @ApiOkResponse({ type: Convocatoria, description: 'Convocatoria aprobada' })
    // approve(@Param('id') id: string, @Req() req) {
    //     return this.svc.aprobar(id, req.user);
    // }

    // ────────────────────────────────────────────────────────────
    // DELETE (soft)
    // ────────────────────────────────────────────────────────────
    @Delete(':id')
    @Roles(TypeRoles.ADMIN, TypeRoles.SUPERADMIN)
    @ApiParam({ name: 'id' })
    @ApiOperation({ summary: 'Elimina lógicamente la convocatoria' })
    @ApiNoContentResponse({ description: 'Convocatoria eliminada' })
    remove(@Param('id') id: string) {
        return this.svc.remove(id);
    }

}