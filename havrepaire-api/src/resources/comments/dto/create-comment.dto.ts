import { ObjectId } from "mongodb";
import { Language } from "../enums/language.enum";

export class CreateCommentDto {
    text: string;
    languages: Language[];
    authorId: string|ObjectId;
    articleId: string|ObjectId;
}
