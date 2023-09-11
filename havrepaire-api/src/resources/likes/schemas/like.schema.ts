import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { User } from 'src/resources/users/schemas/user.schema';
import { Article } from 'src/resources/articles/schemas/article.schema';

@Schema({ timestamps: true })
export class Like {
    @Prop({ type: 'UUID', default: () => randomUUID() })
    _id: 'UUID';

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    article: Article;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
