import type { Languages } from "@/enums/languages.enum";
import type { ObjectId } from "mongodb";

export interface Comment {
    _id: string | ObjectId;
    author: string | ObjectId;
    article: string | ObjectId;
    text: string;
    languages: Languages[];
}