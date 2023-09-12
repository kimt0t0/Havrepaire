import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './resources/users/users.module';
import { LikesModule } from './resources/likes/likes.module';
import { CommentsModule } from './resources/comments/comments.module';
import { ArticlesModule } from './resources/articles/articles.module';
import { IllustrationsModule } from './resources/illustrations/illustrations.module';
import { AuthModule } from './resources/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

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
        ThrottlerModule.forRoot([
            {
                ttl: 60000, //milliseconds
                limit: 100, // number of requests allowed per user on all guarded routes
            },
        ]),
        AuthModule,
        UsersModule,
        LikesModule,
        CommentsModule,
        ArticlesModule,
        IllustrationsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule { }
