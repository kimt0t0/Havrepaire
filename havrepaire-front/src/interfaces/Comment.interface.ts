import type { Languages } from "@/enums/languages.enum";
import type { ObjectId } from "mongodb";
import type { User } from "./User.interface";
import type { Article } from "./Article.interface";

export interface Comment {
    _id: string | ObjectId;
    author: string | ObjectId | User;
    article: string | ObjectId | Article;
    text: string;
    languages: Languages[];
    createdAt: Date;
    updatedAt: Date;
}