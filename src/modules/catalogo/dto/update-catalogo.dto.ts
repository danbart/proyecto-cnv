import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateCatalogoDto } from './create-catalogo.dto';

export class UpdateCatalogoDto extends PartialType(CreateCatalogoDto) {
    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}
