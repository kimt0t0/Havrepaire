import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { ObjectId } from 'mongodb';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    authorId?: string|ObjectId
}
