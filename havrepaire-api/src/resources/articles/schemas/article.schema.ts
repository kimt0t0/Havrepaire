import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { State } from "../enums/state.enum";
import { User } from "src/resources/users/schemas/user.schema";
import { Illustration } from "src/resources/illustrations/schemas/illustration.schema";
import { Like } from "src/resources/likes/schemas/like.schema";
import { Comment } from "src/resources/comments/schemas/comment.schema";
import { ObjectId } from "mongodb";

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

    @Prop({nullable: false})
    parapraphsFr: Array<string>;

    @Prop({nullable: false})
    parapraphsEn: Array<string>;

    @Prop()
    state: State;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Illustration' }] })
    illustrationIds: ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }] })
    likeIds: ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    commentIds: ObjectId[];

}

export const ArticleSchema = SchemaFactory.createForClass(Article);