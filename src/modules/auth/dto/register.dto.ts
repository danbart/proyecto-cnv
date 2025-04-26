import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsEmail, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {

  @ApiProperty({ example: 'admin@cnv.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @ApiProperty({ example: 'Admin' })
  @IsString()
  @MinLength(3)
  fullName: string;

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
