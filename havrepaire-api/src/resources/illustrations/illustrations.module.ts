import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IllustrationsService } from './illustrations.service';
import { IllustrationsController } from './illustrations.controller';
import { Illustration, IllustrationSchema } from './schemas/illustration.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Illustration.name, schema: IllustrationSchema },
    { name: User.name, schema: UserSchema },
    { name: Article.name, schema: ArticleSchema },
  ])],
  controllers: [IllustrationsController],
  providers: [IllustrationsService],
})
export class IllustrationsModule {}
