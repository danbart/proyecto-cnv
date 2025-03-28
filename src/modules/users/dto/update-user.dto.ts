import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ example: 'Admin' })
    @IsString()
    @MinLength(3)
    fullName?: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password?: string;

    @ApiProperty({
        example: ['user'],
        isArray: true,
        required: false,
        enum: ['user', 'admin', 'editor', 'superadmin'],
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    @IsIn(['user', 'admin', 'editor', 'superadmin'], { each: true })
    roles?: string[];
}
