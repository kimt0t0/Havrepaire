import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './resources/users/users.module';
import { LikesModule } from './resources/likes/likes.module';
import { CommentsModule } from './resources/comments/comments.module';
import { ArticlesModule } from './resources/articles/articles.module';
import { IllustrationsModule } from './resources/illustrations/illustrations.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.dev'],
            isGlobal: true,
            cache: true,
        }),
        MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
            dbName: process.env.DB_NAME,
        }),
        UsersModule,
        LikesModule,
        CommentsModule,
        ArticlesModule,
        IllustrationsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
