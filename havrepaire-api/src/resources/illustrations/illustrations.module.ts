import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { IllustrationsService } from './illustrations.service';
import { IllustrationsController } from './illustrations.controller';
import {
    Illustration,
    IllustrationSchema,
} from './schemas/illustration.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';
import { diskStorage } from 'multer';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Illustration.name, schema: IllustrationSchema },
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: diskStorage({
                    destination: './public/files',
                    filename: (req, file, cb) => {
                        const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E4);
                        cb(null, uniquePrefix + file.originalname);
                    }
                })
                // dest: './files',
            }),
        }),
    ],
    controllers: [IllustrationsController],
    providers: [IllustrationsService],
})
export class IllustrationsModule { }
