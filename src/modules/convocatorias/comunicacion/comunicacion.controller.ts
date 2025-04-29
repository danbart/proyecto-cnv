import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TypeRoles } from 'src/common/utils/consts';
import { CrearComunicacionDto, ReintentarEnvioDto } from '../dto/crear-comunicacion.dto';
import { Comunicacion, ComunicacionLog } from '../entities';
import { ComunicacionService } from './comunicacion.service';

@ApiTags('Comunicaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('convocatorias/:convId/comunicaciones')
export class ComunicacionController {
    constructor(private readonly svc: ComunicacionService) { }

    @Post()
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Crear comunicación (correo masivo)' })
    @ApiCreatedResponse({ type: Comunicacion })
    crear(
        @Param('convId') convId: string,
        @Body() dto: CrearComunicacionDto,
        @Req() req,
    ) {
        return this.svc.crear(convId, dto, req.user);
    }

    @Post(':id/enviar')
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Lanzar envíos a los participantes aprobados' })
    @ApiOkResponse({ schema: { example: { enviados: 42 } } })
    enviar(@Param('id') id: string) {
        return this.svc.enviar(id);
    }

    @Post(':id/reintentar')
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Reintentar envíos fallidos' })
    reintentar(@Param('id') id: string, @Body() dto: ReintentarEnvioDto) {
        return this.svc.reintentar(id, dto);
    }

    @Get(':id/logs')
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Ver bitácora de envíos (éxitos / errores)' })
    @ApiOkResponse({ type: ComunicacionLog, isArray: true })
    logs(@Param('id') id: string) {
        return this.svc.getLogs(id);
    }
}

