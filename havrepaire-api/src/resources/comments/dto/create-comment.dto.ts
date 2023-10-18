import { ObjectId } from 'mongodb';
import { Language } from '../enums/language.enum';
import { IsArray, IsString, Length } from 'class-validator';

export class CreateCommentDto {

    @IsString()
    @Length(5, 500)
    text: string;

    @IsArray()
    languages: Language[];

    @IsString()
    @Length(24)
    articleId: string | ObjectId;
}
