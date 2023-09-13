import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateIllustrationDto {

    @IsString()
    @Length(3, 20)
    filename: string;

    @IsString()
    @MaxLength(255)
    filepath: string;

    @IsString()
    @Length(24)
    @IsOptional()
    userId?: string | ObjectId;

    @IsString()
    @Length(24)
    @IsOptional()
    articleId?: string | ObjectId;
}
