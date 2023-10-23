import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '../enums/gender.enum';
import { Role } from '../enums/role.enum';
import { Like } from 'src/resources/likes/schemas/like.schema';
import { Comment } from 'src/resources/comments/schemas/comment.schema';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ length: 80, nullable: false, unique: true })
    username: string;

    @Prop({ length: 120, nullable: false, unique: true })
    email: string;

    @Prop({ length: 256, nullable: false })
    hash: string;

    @Prop()
    gender: Gender;

    @Prop({ length: 80, nullable: true })
    pronouns: string;

    @Prop({ default: Role.VIEWER })
    role: Role;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
    likes: Like[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
