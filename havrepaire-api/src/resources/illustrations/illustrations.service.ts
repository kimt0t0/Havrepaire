import { Injectable } from '@nestjs/common';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Illustration } from './schemas/illustration.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../users/schemas/user.schema';
import { Article } from '../articles/schemas/article.schema';
const fs = require('fs');

@Injectable()
export class IllustrationsService {
    constructor(
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Illustration>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
    ) { }

    async create(createIllustrationDto: CreateIllustrationDto, file: Express.Multer.File) {
        try {
            // check if user exists and if user already has avatar, delete former avatar
            if (createIllustrationDto.userId) {
                try {
                    const user = await this.userModel
                        .findById(
                            new ObjectId(createIllustrationDto.userId)
                        )
                        .exec();
                    user.avatar && await this.illustrationModel.findByIdAndDelete(
                        user.avatar
                    );
                } catch (e) {
                    throw new Error(
                        `Previous avatar of user with id ${createIllustrationDto.userId} could not be removed during illustration creation: ${e}`,
                    );
                }
            }
            //check if article exists if article already has illustration, delete former illustration
            if (createIllustrationDto.articleId) {
                try {
                    const article =
                        await this.articleModel
                            .findById(
                                new ObjectId(createIllustrationDto.articleId)
                            )
                            .exec();
                    article.illustration && await this.illustrationModel.findByIdAndDelete(
                        article.illustration
                    );
                } catch (e) {
                    throw new Error(
                        `Previous illustration of the article with id ${createIllustrationDto.articleId} could not be removed during illustration creation: ${e}`,
                    );
                }
            }
            // create new illustration and save into database
            const filename: string = file.filename;
            const filepath: string = file.path;
            const illustration = new this.illustrationModel(
                {
                    createIllustrationDto,
                    filename,
                    filepath
                }
            );
            const createdIllustration = await illustration.save();
            // update user if avatar
            try {
                createIllustrationDto.userId &&
                    (await this.userModel
                        .findByIdAndUpdate(
                            new ObjectId(createIllustrationDto.userId),
                            { avatar: createdIllustration },
                        )
                        .exec());
            } catch (e) {
                throw new Error(
                    `User could not be updated during illustration creation: ${e}`,
                );
            }
            // update article if article illustration
            try {
                createIllustrationDto.articleId &&
                    (await this.articleModel
                        .findByIdAndUpdate(
                            new ObjectId(createIllustrationDto.articleId),
                            { illustration: createdIllustration },
                        )
                        .exec());
            } catch (e) {
                throw new Error(
                    `Article could not be updated during illustration creation: ${e}`,
                );
            }
            // Return created illustration
            return createdIllustration;
        } catch (e) {
            throw new Error(`Oups, illustration could not be created: ${e}`);
        }
    }

    findAll() {
        try {
            return this.illustrationModel.find().exec();
        } catch (e) {
            throw new Error(`Oups, illustrations could not be loaded: ${e}`);
        }
    }

    findOne(id: string | ObjectId) {
        try {
            return this.illustrationModel.findById(new ObjectId(id)).exec();
        } catch (e) {
            throw new Error(`Oups, illustration could not be found: ${e}`);
        }
    }

    async remove(id: string | ObjectId) {
        try {
            const deletedIllustration = await this.illustrationModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('user', 'article')
                .exec();
            // unlink image
            fs.unlinkSync(deletedIllustration.filepath);
            // update user if avatar
            try {
                deletedIllustration.user &&
                    (await this.userModel.findByIdAndUpdate(
                        deletedIllustration.user,
                        { $delete: 'avatar' },
                    ));
            } catch (e) {
                throw new Error(
                    `Avatar could not be removed from user with id ${deletedIllustration.user} during illustration deletion: ${e}`,
                );
            }
            // update article if illustration
            try {
                deletedIllustration.article &&
                    (await this.articleModel.findByIdAndUpdate(
                        deletedIllustration.user,
                        { $delete: 'illustration' },
                    ));
            } catch (e) {
                throw new Error(
                    `Illustration could not be removed from user with id ${deletedIllustration.article} during illustration deletion: ${e}`,
                );
            }
            return deletedIllustration;
        } catch (e) {
            throw new Error(`Oups, illustration could not be deleted: ${e}`);
        }
    }
}
