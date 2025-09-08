
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty, IsPhoneNumber,
    IsString,
    IsUUID,
    Max, MaxLength,
    Min,
} from 'class-validator';
import { InscripcionEstado } from '../entities/inscripcion-estado.enum';

export class CreateInscripcionDto {
    @ApiProperty({ example: 'Mario', maxLength: 120 })
    @IsString()
    @IsNotEmpty()
    nombres: string;

    @ApiProperty({ example: 'García', maxLength: 120 })
    @IsString()
    @IsNotEmpty()
    apellidos: string;

    @ApiProperty({ example: 'mario@gmail.com' })
    @IsEmail()
    emailPersonal: string;

    @ApiProperty({ example: 'mgarcia@oj.gob.gt', required: false })
    @IsEmail()
    @IsNotEmpty()
    emailOJ?: string;

    @ApiProperty({ example: 'Secretario' })
    @IsUUID()
    cargoId: string

    @ApiProperty({ example: 'Juzgado de Paz' })
    @IsString()
    lugarTrabajo: string;

    @ApiProperty({ example: '12345' })
    @IsString()
    gafete: string;

    @ApiProperty({ example: '+50241234567' })
    @IsPhoneNumber('GT')
    telefono: string;

    @ApiProperty({ example: 'Lic. Ana López' })
    @IsString()
    jefeInmediato: string;

    @ApiProperty({ example: 'Guatemala' })
    @IsUUID()
    departamentoId: string;

    @ApiProperty({ example: 'Mixco' })
    @IsUUID()
    municipioId: string;

    @ApiProperty({ description: 'Índice de la fecha elegida', minimum: 0 })
    @IsInt()
    @Min(0)
    @Max(9)
    indiceFecha: number;
}

export class CambiarEstadoDto {
    @ApiProperty({ enum: InscripcionEstado, example: InscripcionEstado.APROBADA })
    @IsEnum(InscripcionEstado)
    nuevoEstado: InscripcionEstado;

    @ApiProperty({ required: false, maxLength: 500 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    nota?: string;
}
