import type { Gender } from "@/enums/users/gender.enum";
import type { Role } from "@/enums/users/role.enum";
import type { ObjectId } from "mongodb";
import type { Like } from "./Like.interface";
import type { Comment } from "./Comment.interface";

export interface User {
    _id?: string | ObjectId;
    username: string;
    email?: string;
    hash?: string;
    gender: Gender;
    role: Role;
    likes: Like[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}