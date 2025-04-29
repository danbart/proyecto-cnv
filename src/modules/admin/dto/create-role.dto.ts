import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'coordinacion' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: 'Rol con acceso a métricas', required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;
}