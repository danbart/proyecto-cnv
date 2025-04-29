import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsString, Max, MaxLength, Min } from "class-validator";
import { Canal } from "../entities/canal.enum";

export class CrearComunicacionDto {

    @ApiProperty({ enum: Canal, example: Canal.EMAIL })
    @IsEnum(Canal)
    canal: Canal;

    @ApiProperty({ example: 'Invitación al curso' })
    @IsString()
    asunto: string;

    @ApiProperty({
        description: 'Plantilla HTML. Se reemplazan {{fullName}}, {{qrUrl}}, etc.',
        type: 'string',
    })
    @IsString()
    @MaxLength(20_000)
    cuerpoHtml: string;
}

export class ReintentarEnvioDto {
    @ApiProperty({ minimum: 1, maximum: 5, default: 1 })
    @IsInt()
    @Min(1)
    @Max(5)
    intentos: number = 1;
}