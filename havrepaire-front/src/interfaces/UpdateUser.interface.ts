import type { Gender } from "@/enums/users/gender.enum";

export interface UpdateUser {
    username?: string;
    password: string;
    newPassword?: string;
    email?: string;
    gender?: Gender;
    pronouns?: string;
}