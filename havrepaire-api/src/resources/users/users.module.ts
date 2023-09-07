import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Like, LikeSchema } from '../likes/schemas/like.schema';
import { Comment, CommentSchema } from '../comments/schemas/comment.schema';
import { Illustration, IllustrationSchema } from '../illustrations/schemas/illustration.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Article.name, schema: ArticleSchema },
    { name: Illustration.name, schema: IllustrationSchema },
    { name: User.name, schema: UserSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Like.name, schema: LikeSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
