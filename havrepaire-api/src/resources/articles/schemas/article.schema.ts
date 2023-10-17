import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { State } from '../enums/state.enum';
import { Illustration } from 'src/resources/illustrations/schemas/illustration.schema';
import { Like } from 'src/resources/likes/schemas/like.schema';
import { Comment } from 'src/resources/comments/schemas/comment.schema';
import { ObjectId } from 'mongodb';
import { Category } from '../enums/category.enum';

@Schema({ timestamps: true })
export class Article {
    @Prop({
        type: ObjectId,
        default: () => new ObjectId(),
    })
    _id: ObjectId;

    @Prop({ length: 120, nullable: false })
    titleFr: string;

    @Prop({ length: 120 })
    titleEn: string;

    @Prop({ length: 1200, nullable: false })
    parapraphFr: string;

    @Prop({ length: 1200 })
    parapraphEn: string;

    @Prop()
    categories: Category[];

    @Prop({ nullable: false })
    state: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' })
    illustration: Illustration;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
    likes: Like[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
