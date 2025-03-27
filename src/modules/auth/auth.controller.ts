import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registra un nuevo usuario' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicia sesión y devuelve access/refresh token' })
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.generateTokens(user);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresca el access token' })
    async refresh(@Body() body: { userId: string; refreshToken: string }) {
        return this.authService.refresh(body.userId, body.refreshToken);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cerrar sesión y borrar el refresh token' })
    logout(@Request() req) {
        return this.authService.updateRefreshToken(req.user.userId, null);
    }
}
