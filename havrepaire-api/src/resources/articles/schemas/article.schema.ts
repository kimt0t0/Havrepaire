import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { State } from "../enums/state.enum";
import { User } from "src/resources/users/schemas/user.schema";
import { Illustration } from "src/resources/illustrations/schemas/illustration.schema";
import { Like } from "src/resources/likes/schemas/like.schema";
import { Comment } from "src/resources/comments/schemas/comment.schema";
import { ObjectId } from "mongodb";
import { Category } from "../enums/category.enum";

@Schema({ timestamps: true })
export class Article {
    
    @Prop({
        type: ObjectId,
        default: () => new ObjectId()
    })
    _id: ObjectId;

    @Prop({length: 120, nullable: false})
    titleFr: string;

    @Prop({length: 120, nullable: false})
    titleEn: string;

    @Prop({length: 10, nullable: false})
    parapraphFr: string;

    @Prop({length: 10, nullable: false})
    parapraphEn: string;

    @Prop()
    categories: Category[];

    @Prop()
    state: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' })
    illustration: Illustration;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
    likes: Like[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Like[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);