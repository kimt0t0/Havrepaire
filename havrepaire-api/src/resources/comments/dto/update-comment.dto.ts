import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { Language } from '../enums/language.enum';

export class UpdateCommentDto {

    @IsString()
    @Length(5, 500)
    text: string;

    @IsArray()
    @IsOptional()
    languages?: Language[];

}
