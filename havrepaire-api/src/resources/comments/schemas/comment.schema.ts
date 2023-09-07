import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Language } from "../enums/language.enum";
import { User } from "src/resources/users/schemas/user.schema";
import { Article } from "src/resources/articles/schemas/article.schema";

@Schema({ timestamps: true })
export class Comment {
    
    @Prop({type: 'UUID',
    default: () => randomUUID()})
    _id: 'UUID';

    @Prop({length: 1200, nullable: false})
    text: string;

    @Prop()
    language: Language;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    article: Article;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);