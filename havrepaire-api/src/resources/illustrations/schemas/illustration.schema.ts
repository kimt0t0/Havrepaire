import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Article } from "src/resources/articles/schemas/article.schema";
import { User } from "src/resources/users/schemas/user.schema";

@Schema({ timestamps: true })
export class Illustration {
    
    @Prop({
        type: ObjectId,
        default: () => new ObjectId()
    })
    _id: ObjectId;

    @Prop({length: 80, nullable: false})
    filename: string;

    @Prop({length: 256})
    filepath: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    articleId: ObjectId;
    
}

export const IllustrationSchema = SchemaFactory.createForClass(Illustration);
