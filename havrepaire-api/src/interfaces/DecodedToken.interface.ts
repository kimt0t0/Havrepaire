import { ObjectId } from "mongodb";
import { Role } from "src/resources/users/enums/role.enum";

export interface DecodedToken {
    _id: string | ObjectId;
    username: string;
    role: Role;
}