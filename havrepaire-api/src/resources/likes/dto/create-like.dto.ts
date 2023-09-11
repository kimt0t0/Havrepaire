import { ObjectId } from 'mongodb';

export class CreateLikeDto {
    authorId: string | ObjectId;
    articleId: string | ObjectId;
}
