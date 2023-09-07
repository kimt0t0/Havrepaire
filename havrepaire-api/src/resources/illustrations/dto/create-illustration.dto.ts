import { ObjectId } from "mongodb";

export class CreateIllustrationDto {
    filename: string;
    filepath: string;
    userId?: string|ObjectId;
    articleId?: string|ObjectId;
}
