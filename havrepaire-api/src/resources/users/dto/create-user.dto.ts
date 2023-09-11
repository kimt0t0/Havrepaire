import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    username: string;
    hash: string;
    email: string;
    gender?: Gender;
    pronouns?: string;
    role?: Role;
}
