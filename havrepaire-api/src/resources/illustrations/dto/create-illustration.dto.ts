import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateIllustrationDto {

    @IsString()
    @Length(24)
    @IsOptional()
    userId?: string | ObjectId;

    @IsString()
    @Length(24)
    @IsOptional()
    articleId?: string | ObjectId;
}
