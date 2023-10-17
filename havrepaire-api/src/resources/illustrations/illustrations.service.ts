import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Illustration } from './schemas/illustration.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Article } from '../articles/schemas/article.schema';
const fs = require('fs');

@Injectable()
export class IllustrationsService {
    constructor(
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Illustration>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
    ) { }

    async create(createIllustrationDto: CreateIllustrationDto, file: Express.Multer.File) {
        try {
            const articleId = new ObjectId(createIllustrationDto.articleId);
            //check if article exists if article already has illustration, delete former illustration
            if (articleId) {
                console.log(articleId.toString());
                try {
                    const article: Article =
                        await this.articleModel
                            .findById(articleId)
                            .populate('illustration')
                            .exec();
                    console.log(JSON.stringify(article));
                    if (article.illustration) await this.remove(new ObjectId(article.illustration._id));
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
                    article: new ObjectId(articleId),
                    filename,
                    filepath
                }
            );
            const createdIllustration = await illustration.save();
            // update article if article illustration
            try {
                await this.articleModel
                    .findByIdAndUpdate(
                        new ObjectId(createIllustrationDto.articleId),
                        { illustration: createdIllustration },
                    )
                    .exec();
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
        if (id.toString().length !== 24) {
            throw new NotAcceptableException(`You must use a 24 characters identifier to load an image.`);
        }
        try {
            return this.illustrationModel.findById(new ObjectId(id)).exec();
        } catch (e) {
            throw new NotFoundException(`Oups, illustration with id ${id} could not be found.`);
        }
    }

    async remove(id: string | ObjectId) {
        try {
            const deletedIllustration = await this.illustrationModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('article')
                .exec();
            // unlink image
            fs.unlinkSync(deletedIllustration.filepath);
            // update article if illustration
            try {
                deletedIllustration.article &&
                    (await this.articleModel.findByIdAndUpdate(
                        deletedIllustration.article,
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
