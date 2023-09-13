import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    @IsString()
    @Length(3, 80)
    username: string;

    @IsStrongPassword()
    @Length(8, 60)
    password: string;

    @IsEmail()
    @Length(8, 100)
    email: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsString()
    @Length(2, 10)
    @IsOptional()
    pronouns?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
