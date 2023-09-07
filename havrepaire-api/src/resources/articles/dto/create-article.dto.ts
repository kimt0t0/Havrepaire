import { ObjectId } from "mongodb";
import { State } from "../enums/state.enum";
import { Category } from "../enums/category.enum";

export class CreateArticleDto {
    titleFr: string;
    titleEn?: string;
    parapraphsFr: string[];
    parapraphsEn?: string[];
    categories?: Category[];
    state?: State;
    authorId: string|ObjectId;
    illustrationIds?: string[]|ObjectId[];
}
