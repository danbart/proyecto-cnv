import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: 'Admin' })
    fullName?: string;
    @ApiProperty({ example: '123456' })
    password?: string;
    @ApiProperty({ example: 'Admin' })
    role?: string;
}
