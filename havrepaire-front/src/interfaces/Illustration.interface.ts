import type { ObjectId } from "mongodb";
import type { Article } from "./Article.interface";

export interface Illustration {
    _id: string | ObjectId;
    filename: string;
    filepath: string;
    article: string | ObjectId | Article;
    createdAt: Date;
    updatedAt: Date;
}