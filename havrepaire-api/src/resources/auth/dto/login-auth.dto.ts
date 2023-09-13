import { IsString, IsStrongPassword, Length } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @Length(3, 80)
    username: string;

    @IsStrongPassword()
    @Length(8, 60)
    password: string;
}
