import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { ObjectId } from 'mongodb';
import { User } from '../users/schemas/user.schema';
import { Comment } from '../comments/schemas/comment.schema';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>,
    ) {}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        try {
            const article = new this.articleModel(createArticleDto);
            const createdArticle = await article.save();
            return createdArticle;
        } catch (e) {
            throw new Error(`Oups, article could not be created: ${e}`);
        }
    }

    findAll() {
        try {
            return this.articleModel
                .find()
                .populate('illustration', 'comments')
                .exec();
        } catch (e) {
            throw new Error(`Oups, articles could not be loaded: ${e}`);
        }
    }

    findOne(id: string | ObjectId) {
        try {
            return this.articleModel
                .findById(new ObjectId(id))
                .populate('illustration', 'comments')
                .exec();
        } catch (e) {
            throw new Error(`Oups, article could not be found: ${e}`);
        }
    }

    async update(id: string | ObjectId, updateArticleDto: UpdateArticleDto) {
        try {
            await this.articleModel
                .findByIdAndUpdate(new ObjectId(id), updateArticleDto)
                .exec();
            const updatedArticle = await this.articleModel
                .findById(new ObjectId(id))
                .populate('illustration')
                .exec();
            return updatedArticle;
        } catch (e) {
            throw new Error(`Oups, article could not be updated: ${e}`);
        }
    }

    async remove(id: string | ObjectId) {
        try {
            const deletedArticle = await this.articleModel
                .findByIdAndDelete(new ObjectId(id))
                .exec();
            // delete comments
            try {
                if (deletedArticle.comments) {
                    for (const comment of deletedArticle.comments) {
                        const deletedComment = await this.commentModel
                            .findByIdAndDelete(comment._id)
                            .populate('author')
                            .exec();
                        if (!deletedComment)
                            throw new Error(
                                `Comment with id ${comment._id} was not found`,
                            );
                        try {
                            await this.userModel
                                .findByIdAndUpdate(deletedComment.author._id, {
                                    $pull: { comments: deletedComment._id },
                                })
                                .populate('comments')
                                .exec();
                        } catch (e) {
                            throw new Error(
                                `Oups, comment with id ${comment._id}could not be removed from user with id ${deletedComment.author._id}:${e}`,
                            );
                        }
                    }
                }
            } catch (e) {
                throw new Error(
                    `Oups, user's comments could not be deleted: ${e}`,
                );
            }
            return deletedArticle;
        } catch (e) {
            throw new Error(`Oups, article could not be deleted: ${e}`);
        }
    }
}
