import { IsString, Length } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateLikeDto {

    @IsString()
    @Length(24)
    articleId: string | ObjectId;
}
