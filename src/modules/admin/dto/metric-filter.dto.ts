import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { ConvocatoriaEstado } from "src/common/enums/convocatoria-estado.enum";

export class MetricFilterDto {
    @ApiProperty({ required: false, enum: ConvocatoriaEstado, isArray: true })
    @IsEnum(ConvocatoriaEstado, { each: true })
    @IsOptional()
    estados?: ConvocatoriaEstado[];

    @ApiProperty({ required: false, example: '2025-05-01' })
    @IsDateString()
    @IsOptional()
    desde?: string;

    @ApiProperty({ required: false, example: '2025-12-31' })
    @IsDateString()
    @IsOptional()
    hasta?: string;
}