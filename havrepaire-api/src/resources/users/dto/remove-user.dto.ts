import { IsEmail, IsStrongPassword, Length } from "class-validator";

export class RemoveUserDto {
    @IsEmail()
    @Length(8, 100)
    userEmail: string;

    @IsStrongPassword()
    @Length(8, 60)
    userPassword: string;
}