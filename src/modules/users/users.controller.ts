import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuditInterceptor } from '../../common/interceptors/audit.interceptor';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Usuarios')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuditInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles('admin', 'superAdmin', 'user')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles('admin', 'superAdmin', 'user')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar un usuario por ID' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @Roles('admin', 'superAdmin', 'user')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
