import { ObjectId } from 'mongodb';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';
import { Comment } from 'src/resources/comments/schemas/comment.schema';
import { Like } from 'src/resources/likes/schemas/like.schema';
import { Gender } from '../enums/gender.enum';
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, IsUUID, Length } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @Length(3, 80)
    @IsOptional()
    username?: string;

    @IsStrongPassword()
    @Length(8, 60)
    password: string;

    @IsStrongPassword()
    @Length(8, 60)
    @IsOptional()
    newPassword?: string;

    @IsEmail()
    @Length(8, 100)
    @IsOptional()
    email?: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsString()
    @Length(2, 10)
    @IsOptional()
    pronouns?: string;

    @IsUUID()
    @IsOptional()
    avatar?: Illustration;

    @IsArray()
    @IsOptional()
    likes?: Like[];

    @IsArray()
    @IsOptional()
    comments?: Comment[];

    @IsString()
    @IsOptional()
    authorId?: string | ObjectId;

    @IsString()
    @Length(24)
    @IsOptional()
    articleId?: string | ObjectId;
}
