import { ObjectId } from "mongodb";
import { State } from "../enums/state.enum";

export class CreateArticleDto {
    titleFr: string;
    titleEn?: string;
    paragraphsFr: string[];
    paragraphesEn?: string[];
    state?: State;
    authorId: string|ObjectId;
    illustrationIds?: string[]|ObjectId[];
}
