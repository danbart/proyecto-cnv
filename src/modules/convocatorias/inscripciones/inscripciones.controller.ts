import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { TypeRoles } from "src/common/utils/consts";
import { CambiarEstadoDto, CreateInscripcionDto } from "../dto/create-inscripcion.dto";
import { Inscripcion } from "../entities/inscripcion.entity";
import { InscripcionesService } from "./inscripciones.service";

@ApiTags('Inscripciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('convocatorias/:id/inscripciones')
export class InscripcionesController {
    constructor(private readonly svc: InscripcionesService) { }

    /* -------- Registro público -------- */
    @Post()
    @ApiOperation({ summary: 'Registrar participante a una convocatoria' })
    @ApiCreatedResponse({ type: Inscripcion })
    @ApiBadRequestResponse()
    create(
        @Param('id') id: string,
        @Body() dto: CreateInscripcionDto,
    ) {
        return this.svc.crear(id, dto);
    }

    /* -------- Listado (encargado / jefe) -------- */
    @Get()
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Listar inscripciones de la convocatoria' })
    @ApiOkResponse({ type: Inscripcion, isArray: true })
    listar(@Param('id') id: string) {
        return this.svc.listar(id);
    }

    /* -------- Cambiar estado -------- */
    @Patch(':id/estado')
    @Roles(TypeRoles.EDITOR, TypeRoles.ADMIN)
    @ApiOperation({ summary: 'Aprobar / rechazar / cancelar inscripción' })
    @ApiOkResponse({ type: Inscripcion })
    cambiarEstado(
        @Param('id') id: string,
        @Body() dto: CambiarEstadoDto,
        @Req() req,
    ) {
        return this.svc.cambiarEstado(id, dto, req.user);
    }
}
