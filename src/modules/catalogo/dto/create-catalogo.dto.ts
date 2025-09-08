import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, MaxLength } from "class-validator";
import { CatalogoType } from "../entities/catalogo-type.enum";

export class CreateCatalogoDto {
    @ApiProperty({ enum: CatalogoType })
    @IsEnum(CatalogoType)
    tipo: CatalogoType;

    @ApiProperty({ example: 'RIAEJ' })
    @IsString()
    @MaxLength(20)
    codigo: string;

    @ApiProperty({ example: 'Curso Internacional' })
    @IsString()
    @MaxLength(120)
    nombre: string;
}