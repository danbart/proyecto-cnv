import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'admin@cnv.com' })
    email: string;
    @ApiProperty({ example: '123456' })
    password: string;
    @ApiProperty({ example: 'Admin' })
    fullName: string;
    @ApiProperty({ example: 'admin' })
    role?: string;
}
