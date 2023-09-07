import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like, LikeSchema } from './schemas/like.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Like.name, schema: LikeSchema },
    { name: User.name, schema: UserSchema },
    { name: Article.name, schema: ArticleSchema },
  ])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
