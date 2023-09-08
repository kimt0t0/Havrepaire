import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Language } from "../enums/language.enum";
import { User } from "src/resources/users/schemas/user.schema";
import { Article } from "src/resources/articles/schemas/article.schema";
import { ObjectId } from "mongodb";

@Schema({ timestamps: true })
export class Comment {
    
    @Prop({
        type: ObjectId,
        default: () => new ObjectId()
    })
    _id: ObjectId;

    @Prop({length: 500, nullable: false})
    text: string;

    @Prop()
    languages: Language[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    article: Article;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);