import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PublicarDto, RevisarConvocatoriaDto } from '../dto/logs-convocatoria-dto';
import { Convocatoria } from '../entities/convocatoria.entity';
import { AprobacionesService } from './aprobaciones.service';

@ApiTags('Convocatorias · Flujos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('convocatorias/:id/flujo')
export class AprobacionesController {
    constructor(private readonly svc: AprobacionesService) { }

    // ---------- Enviar a revisión ----------
    @Patch('enviar')
    @Roles('editor', 'superadmin')
    @ApiOperation({ summary: 'Enviar convocatoria a revisión (BORRADOR → EN_REVISION)' })
    @ApiParam({ name: 'id', description: 'UUID de la convocatoria' })
    @ApiOkResponse({ type: Convocatoria })
    @ApiForbiddenResponse({ description: 'No posee rol encargado o no es creador' })
    @ApiBadRequestResponse({ description: 'La convocatoria no está en BORRADOR' })
    @ApiNotFoundResponse({ description: 'Convocatoria no encontrada' })
    enviar(@Param('id') id: string, @Req() req) {
        return this.svc.enviarRevision(id, req.user);
    }

    // ---------- Revisión (admin) ----------
    @Patch('revisar')
    @Roles('admin', 'superadmin')
    @ApiOperation({
        summary: 'Revisar convocatoria (EN_REVISION → APROBADA | EN_MODIFICACION)',
    })
    @ApiParam({ name: 'id', description: 'UUID de la convocatoria' })
    @ApiOkResponse({ type: Convocatoria })
    @ApiForbiddenResponse({ description: 'Sin rol jefe' })
    @ApiBadRequestResponse({ description: 'Estado inválido o DTO erróneo' })
    revisar(
        @Param('id') id: string,
        @Body() dto: RevisarConvocatoriaDto,
        @Req() req,
    ) {
        return this.svc.revisar(id, dto, req.user);
    }

    // ---------- Publicar ----------
    @Patch('publicar')
    @Roles('editor', 'admin', 'superadmin')
    @ApiOperation({ summary: 'Publicar convocatoria (APROBADA → PUBLICADA)' })
    @ApiParam({ name: 'id', description: 'UUID de la convocatoria' })
    @ApiOkResponse({ type: Convocatoria })
    @ApiForbiddenResponse({ description: 'Sin rol publicador' })
    @ApiBadRequestResponse({ description: 'La convocatoria no está APROBADA' })
    publicar(
        @Param('id') id: string,
        @Body() dto: PublicarDto,
        @Req() req,
    ) {
        return this.svc.publicar(id, dto, req.user);
    }
}
