import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/resources/users/schemas/user.schema';
import { Article } from 'src/resources/articles/schemas/article.schema';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true })
export class Like {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    article: Article;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
