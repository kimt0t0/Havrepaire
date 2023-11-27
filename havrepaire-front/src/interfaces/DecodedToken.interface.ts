import type { ObjectId } from "mongodb";
import type { Role } from "@/enums/users/role.enum";

export interface DecodedToken {
    _id: string | ObjectId;
    username: string;
    role: Role;
}