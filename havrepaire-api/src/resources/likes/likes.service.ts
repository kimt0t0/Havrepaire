import { BadRequestException, Inject, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { decodeToken } from 'src/utils/token.utils';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './schemas/like.schema';
import { Article } from '../articles/schemas/article.schema';
import { User } from '../users/schemas/user.schema';
import { ObjectId } from 'mongodb';
import { Role } from '../users/enums/role.enum';

@Injectable()
export class LikesService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(Like.name)
        private likeModel: Model<Like>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }

    async create(createLikeDto: CreateLikeDto) {
        const { articleId } = createLikeDto;
        if (typeof articleId !== 'string' && articleId.toString().length !== 24) throw new NotAcceptableException(`Article id must be a 24 alphanumerical identifier.`);
        try {
            // get user id from token and check if exists
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            const authorId = decodedToken._id;
            const checkedAuthor = await this.userModel.findById(new ObjectId(authorId))
                .select('-hash')
                .select('-email')
                .select('-id');;
            if (!checkedAuthor) throw new NotAcceptableException(`User with id ${authorId} does not exist. Cannot add like.`);
            // check if like already exists from user on article
            // if like exists remove it:
            const targetedArticle = await this.articleModel
                .findById(new ObjectId(articleId))
                .populate('likes');
            if (targetedArticle.likes) {
                for (let like of targetedArticle.likes) {
                    if (like.author._id.toString() === authorId) {
                        const existingLike = like;
                        this.remove(existingLike._id);
                        return null;
                    }
                }
            }
            // else create new like:
            const article = await this.articleModel.findById(
                new ObjectId(articleId),
            );
            if (!article)
                throw new NotFoundException(
                    `Oups, article with id ${articleId} could not be found on like creation...`,
                );
            const author = await this.userModel
                .findById(
                    new ObjectId(authorId),
                )
                .select('-hash')
                .select('-email')
                .select('-id');
            if (!author)
                throw new Error(
                    `Oups, user with id ${authorId} could not be found on like creation...`,
                );
            const newLike = new this.likeModel({
                author,
                article,
            });
            const createdLike = await newLike.save();
            // add to user:
            try {
                await this.userModel.findByIdAndUpdate(
                    new ObjectId(authorId),
                    { $push: { likes: createdLike } },
                );
            } catch (e) {
                throw new Error(
                    `User could not be updated during like creation: ${e}`,
                );
            }
            // add to article:
            try {
                await this.articleModel.findByIdAndUpdate(
                    new ObjectId(articleId),
                    { $push: { likes: createdLike } },
                );
            } catch (e) {
                throw new Error(
                    `Article could not be updated during like creation: ${e}`,
                );
            }
            // return created like:
            return createdLike;
        } catch (e) {
            throw new BadRequestException(`Oups, like could not be created !`);
        }
    }

    findAll() {
        try {
            return this.likeModel.find().populate('author', 'article').exec();
        } catch (e) {
            throw new Error(`Oups, likes could not be loaded: ${e}`);
        }
    }

    findOne(id: string | ObjectId) {
        try {
            return this.likeModel.findById(new ObjectId(id));
        } catch (e) {
            throw new Error(
                `Oups, like with id ${id} could not be found: ${e}`,
            );
        }
    }

    async remove(id: string | ObjectId) {
        try {
            // get user id from token and check if exists
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            const authorId = decodedToken._id;
            const authenticatedUser = await this.userModel.findById(new ObjectId(authorId))
                .select('-hash')
                .select('-email')
                .select('-id');
            // check if user exists and is like author or admin
            if (!authenticatedUser) throw new NotAcceptableException(`User with id ${authorId} does not exist. Cannot add like.`);
            if (decodedToken._id !== authenticatedUser._id.toString() && authenticatedUser.role !== Role.ADMIN) throw new UnauthorizedException(`User must be authenticated and must be admin or comment's author to modify it.`);
            // delete like
            const deletedLike = await this.likeModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('author', 'article')
                .exec();
            // update user
            try {
                const updatedUser: User = await this.userModel.findByIdAndUpdate(
                    deletedLike.author._id,
                    { $pull: { likes: deletedLike._id } },
                );
            } catch (e) {
                throw new Error(
                    `Like with id ${id} could not be removed from user with id ${deletedLike.author} during like deletion: ${e}`,
                );
            }
            // update article
            try {
                await this.articleModel.findByIdAndUpdate(
                    deletedLike.article._id,
                    { $pull: { likes: deletedLike._id } },
                );
            } catch (e) {
                throw new Error(
                    `Like could not be removed from article with id ${deletedLike.article._id} during like deletion: ${e}`,
                );
            }
            // return deleted object
            return deletedLike;
        } catch (e) {
            throw new Error(`Oups, like could not be deleted: ${e}`);
        }
    }
}
