import { ObjectId } from 'mongodb';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';
import { Comment } from 'src/resources/comments/schemas/comment.schema';
import { Like } from 'src/resources/likes/schemas/like.schema';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDto {
    username?: string;
    password: string;
    newPassword?: string;
    email?: string;
    gender?: Gender;
    pronouns?: string;
    avatar?: Illustration;
    likes?: Like[];
    comments?: Comment[];
    authorId?: string | ObjectId;
    articleId?: string | ObjectId;
}
