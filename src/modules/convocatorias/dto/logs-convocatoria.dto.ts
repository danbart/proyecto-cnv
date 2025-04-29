import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ConvocatoriaEstado } from 'src/common/enums/convocatoria-estado.enum';

export class RevisarConvocatoriaDto {
  @ApiProperty({
    description: 'Nuevo estado tras la revisión',
    enum: [ConvocatoriaEstado.APROBADA, ConvocatoriaEstado.EN_MODIFICACION],
    example: ConvocatoriaEstado.APROBADA,
  })
  @IsEnum(ConvocatoriaEstado)
  @IsIn([ConvocatoriaEstado.APROBADA, ConvocatoriaEstado.EN_MODIFICACION])
  nuevoEstado: ConvocatoriaEstado;

  @ApiPropertyOptional({
    description: 'Comentario del revisor (motivo de ajustes o notas)',
    maxLength: 1000,
    example: 'Ajustar la fecha de cierre y anexar programa académico.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comentario?: string;
}

export class PublicarDto {
  @ApiPropertyOptional({
    description: 'Nota interna sobre la publicación',
    example: 'Contenido subido al portal y correos programados.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  nota?: string;
}

