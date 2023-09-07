import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { State } from "../enums/state.enum";
import { User } from "src/resources/users/schemas/user.schema";
import { Illustration } from "src/resources/illustrations/schemas/illustration.schema";
import { Like } from "src/resources/likes/schemas/like.schema";
import { Comment } from "src/resources/comments/schemas/comment.schema";

@Schema({ timestamps: true })
export class Article {
    
    @Prop({type: 'UUID',
    default: () => randomUUID()})
    _id: 'UUID';

    @Prop({length: 120, nullable: false})
    titleFr: string;

    @Prop({length: 120, nullable: false})
    titleEn: string;

    @Prop({nullable: false})
    parapraphsFr: string[];

    @Prop({nullable: false})
    parapraphsEn: string[];

    @Prop()
    state: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' }] })
    illustrations: Illustration[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
    likes: Like[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);