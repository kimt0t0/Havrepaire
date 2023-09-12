import { Language } from '../enums/language.enum';

export class UpdateCommentDto {
    text: string;
    languages: Language[];
}
