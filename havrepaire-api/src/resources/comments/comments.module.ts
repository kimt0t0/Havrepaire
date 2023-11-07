import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule { }
