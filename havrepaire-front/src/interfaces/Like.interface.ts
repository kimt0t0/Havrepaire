import type { ObjectId } from "mongodb";
import type { User } from "./User.interface";
import type { Article } from "./Article.interface";

export interface Like {
    _id: string | ObjectId;
    author: string | ObjectId | User;
    article: string | ObjectId | Article;
    createdAt: Date;
    updatedAt: Date;
}