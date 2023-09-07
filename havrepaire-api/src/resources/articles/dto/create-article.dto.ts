import { ObjectId } from "mongodb";
import { State } from "../enums/state.enum";
import { Category } from "../enums/category.enum";

export class CreateArticleDto {
    titleFr: string;
    titleEn?: string;
    parapraphFr: string;
    parapraphEn?: string;
    categories?: Category[];
    state?: State;
    illustrationId?: string|ObjectId;
}
