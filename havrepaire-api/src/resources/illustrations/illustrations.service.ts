import { Injectable } from '@nestjs/common';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Illustration } from './schemas/illustration.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../users/schemas/user.schema';
import { Article } from '../articles/schemas/article.schema';

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

    async create(createIllustrationDto: CreateIllustrationDto) {
        try {
            // create new illustration and save into database
            const illustration = new this.illustrationModel(
                createIllustrationDto,
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

    async update(
        id: string | ObjectId,
        updateIllustrationDto: UpdateIllustrationDto,
    ) {
        try {
            // update and read illustration
            await this.illustrationModel
                .findByIdAndUpdate(new ObjectId(id), updateIllustrationDto)
                .exec();
            const updatedIllustration = await this.illustrationModel
                .findById(new ObjectId(id))
                .exec();
            // update user if avatar
            try {
                updateIllustrationDto.userId &&
                    (await this.userModel
                        .findByIdAndUpdate(
                            new ObjectId(updateIllustrationDto.userId),
                            { avatar: updatedIllustration },
                        )
                        .exec());
            } catch (e) {
                throw new Error(
                    `User could not be updated during illustration update: ${e}`,
                );
            }
            // update article if article illustration
            try {
                updateIllustrationDto.articleId &&
                    (await this.articleModel
                        .findByIdAndUpdate(
                            new ObjectId(updateIllustrationDto.articleId),
                            { illustration: updatedIllustration },
                        )
                        .exec());
            } catch (e) {
                throw new Error(
                    `Article could not be updated during illustration update: ${e}`,
                );
            }
            return updatedIllustration;
        } catch (e) {
            throw new Error(`Oups, illustration could not be updated: ${e}`);
        }
    }

    async remove(id: string | ObjectId) {
        try {
            const deletedIllustration = await this.illustrationModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('user', 'article')
                .exec();
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
