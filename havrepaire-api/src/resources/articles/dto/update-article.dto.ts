import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { ObjectId } from 'mongodb';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsArray()
    @IsOptional()
    likeIds?: string[] | ObjectId[];

    @IsArray()
    @IsOptional()
    commentIds?: string[] | ObjectId[];
}
