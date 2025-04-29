import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { MetricFilterDto } from './dto/metric-filter.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { HierarchyGuard } from './guards/hierarchy.guard';

@ApiTags('Administración')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, HierarchyGuard)
@Controller('admin')
export class AdminController {
    constructor(private svc: AdminService) { }

    // ---------- Roles ----------
    @Post('roles')
    @Roles('superadmin')
    @ApiOperation({ summary: 'Crear nuevo rol' })
    createRole(@Body() dto: CreateRoleDto) { return this.svc.createRole(dto); }

    @Patch('roles/:id')
    @Roles('superadmin')
    updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
        return this.svc.updateRole(id, dto);
    }

    @Get('roles')
    @Roles('superadmin')
    listRoles() { return this.svc.listRoles(); }

    @Delete('roles/:id')
    @Roles('superadmin')
    delRole(@Param('id') id: string) { return this.svc.deleteRole(id); }

    // ---------- Jerarquía ----------
    @Post('roles/:child/parent/:parent')
    @Roles('superadmin')
    @ApiOperation({ summary: 'Asignar rol padre-hijo' })
    setParent(
        @Param('child') child: string,
        @Param('parent') parent: string,
    ) {
        return this.svc.setParent(child, parent);
    }

    // ---------- Métricas ----------
    @Get('metricas')
    @Roles('coordinacion', 'superadmin')
    @ApiOperation({ summary: 'Dashboard de métricas de convocatorias' })
    metrics(@Query() f: MetricFilterDto) { return this.svc.metrics(f); }
}

