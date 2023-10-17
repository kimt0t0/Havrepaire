import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { ObjectId } from 'mongodb';
import { User } from '../users/schemas/user.schema';
import { Comment } from '../comments/schemas/comment.schema';
import { Like } from '../likes/schemas/like.schema';
import { State } from './enums/state.enum';
import { Category } from './enums/category.enum';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>,
        @InjectModel(Like.name)
        private likeModel: Model<Like>,
    ) { }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        try {
            if (!createArticleDto.state) createArticleDto.state = State.DRAFT;
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
        if (id.toString().length !== 24) {
            throw new NotAcceptableException(`You must enter a 24 characters identifier in the URI to load an article`);
        }
        try {
            return this.articleModel
                .findById(new ObjectId(id))
                .populate('illustration', 'comments')
                .exec();
        } catch (e) {
            throw new NotFoundException(`Oups, article with id ${id} could not be found.`);
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
            // delete likes
            try {
                if (deletedArticle.likes) {
                    for (const like of deletedArticle.likes) {
                        const deletedLike = await this.likeModel
                            .findByIdAndDelete(like._id)
                            .populate('author')
                            .exec();
                        if (!deletedLike)
                            throw new Error(
                                `Like with id ${like._id} was not found`,
                            );
                        try {
                            await this.userModel
                                .findByIdAndUpdate(deletedLike.author._id, {
                                    $pull: { likes: deletedLike._id },
                                })
                                .populate('likes')
                                .exec();
                        } catch (e) {
                            throw new Error(
                                `Oups, like with id ${like._id}could not be removed from user with id ${deletedLike.author._id}:${e}`,
                            );
                        }
                    }
                }
            } catch (e) {
                throw new Error(
                    `Oups, user's likes could not be deleted: ${e}`,
                );
            }
            return deletedArticle;
        } catch (e) {
            throw new Error(`Oups, article could not be deleted: ${e}`);
        }
    }
}
