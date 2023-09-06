import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/users/users.module';
import { LikesModule } from './resources/likes/likes.module';
import { CommentsModule } from './resources/comments/comments.module';
import { ArticlesModule } from './resources/articles/articles.module';
import { User } from './resources/users/entities/user.entity';
import { Like } from './resources/likes/entities/like.entity';
import { Comment } from './resources/comments/entities/comment.entity';
import { Article } from './resources/articles/entities/article.entity';
import { Illustration } from './resources/illustrations/entities/illustration.entity';
import { IllustrationsModule } from './resources/illustrations/illustrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
      isGlobal: true,
      cache: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_CONNECTION_STRING,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      entities: [User, Like, Comment, Article, Illustration],
      retryAttempts: 5,
      synchronize: true,
    }),
    UsersModule,
    LikesModule,
    CommentsModule,
    ArticlesModule,
    IllustrationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
