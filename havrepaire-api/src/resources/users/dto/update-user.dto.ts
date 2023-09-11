import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongodb';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';
import { Comment } from 'src/resources/comments/schemas/comment.schema';
import { Like } from 'src/resources/likes/schemas/like.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatar?: Illustration;
    likes?: Like[];
    comments?: Comment[];
    authorId?: string | ObjectId;
    articleId?: string | ObjectId;
}
