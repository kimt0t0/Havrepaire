import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ObjectId } from 'mongodb';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatar?: Illustration;
    likeIds?: string[]|ObjectId[];
    commentIds?: string[]|ObjectId[];
}
