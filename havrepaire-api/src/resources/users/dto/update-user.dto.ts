import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongodb';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatarId?: string|ObjectId;
    likeIds?: string[]|ObjectId[];
    commentIds?: string[]|ObjectId[];
}
