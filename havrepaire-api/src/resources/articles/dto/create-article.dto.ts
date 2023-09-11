import { ObjectId } from 'mongodb';
import { State } from '../enums/state.enum';
import { Category } from '../enums/category.enum';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';

export class CreateArticleDto {
    titleFr: string;
    titleEn?: string;
    parapraphFr: string;
    parapraphEn?: string;
    categories?: Category[];
    state?: State;
    illustration?: Illustration;
}
