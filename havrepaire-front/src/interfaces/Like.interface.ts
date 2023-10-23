import type { ObjectId } from "mongodb";

export interface Like {
    _id: string | ObjectId;
    author: string | ObjectId;
    article: string | ObjectId;
}