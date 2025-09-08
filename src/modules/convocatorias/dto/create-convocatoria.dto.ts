import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class RangoFechaDto {
    @IsNotEmpty()
    @Type(() => Date)
    fechaInicio: Date;

    @IsNotEmpty()
    @Type(() => Date)
    fechaFin: Date;
}

export class CreateConvocatoriaDto {

    @ApiProperty({ example: 'Convocatoria 2023' })
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @ApiProperty({ example: 'Convocatoria para el año 2023' })
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // tipo: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // modalidad: string;

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RangoFechaDto)
    fechas: RangoFechaDto[];

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    cupo: number;

    @ApiProperty({ example: 'ab1c‑d2e3‑…', description: 'ID de catálogo TIPO_CONVOCATORIA' })
    @IsUUID()
    tipoId: string;

    @ApiProperty({ example: 'cd4e‑f5g6‑…', description: 'ID de catálogo MODALIDAD' })
    @IsUUID()
    modalidadId: string;

    // estado no se expone: se crea en BORRADOR
}