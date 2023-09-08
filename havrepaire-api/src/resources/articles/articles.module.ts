import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Illustration, IllustrationSchema } from '../illustrations/schemas/illustration.schema';
import { Comment , CommentSchema} from '../comments/schemas/comment.schema';
import { Like, LikeSchema } from '../likes/schemas/like.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Article.name, schema: ArticleSchema },
    { name: Illustration.name, schema: IllustrationSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Like.name, schema: LikeSchema },
    { name: User.name, schema: UserSchema},
  ])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
