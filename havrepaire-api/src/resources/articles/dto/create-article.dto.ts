import { State } from '../enums/state.enum';
import { Category } from '../enums/category.enum';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';
import { IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateArticleDto {

    @IsString()
    @Length(3, 120)
    titleFr: string;

    @IsString()
    @Length(3, 120)
    @IsOptional()
    titleEn?: string;

    @IsString()
    @Length(10, 1200)
    parapraphFr: string;

    @IsString()
    @Length(10, 1200)
    @IsOptional()
    parapraphEn?: string;

    @IsArray()
    @IsOptional()
    categories?: Category[];

    @IsEnum(State)
    @IsOptional()
    state?: State;

    @IsString()
    @Length(24)
    illustration?: Illustration;
}
