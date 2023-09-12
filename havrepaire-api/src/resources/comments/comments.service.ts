import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { User } from '../users/schemas/user.schema';
import { Article } from '../articles/schemas/article.schema';
import { ObjectId } from 'mongodb';
import { decodeToken } from 'src/utils/token.utils';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class CommentsService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
    ) { }

    async create(createCommentDto: CreateCommentDto) {
        const { text, languages, authorId, articleId } = createCommentDto;
        try {
            // get author
            const author = await this.userModel.findById(
                new ObjectId(authorId),
            );
            if (!author)
                throw new Error(
                    `Oups, user with id ${authorId} could not be found on comment creation...`,
                );
            // get article
            const article = await this.articleModel.findById(
                new ObjectId(articleId),
            );
            if (!article)
                throw new Error(
                    `Oups, article with id ${articleId} could not be found on comment creation...`,
                );
            const comment = new this.commentModel({
                text,
                languages,
                author,
                article,
            });
            const createdComment = await comment.save();
            // add to user
            try {
                createCommentDto.authorId &&
                    (await this.userModel.findByIdAndUpdate(
                        new ObjectId(createCommentDto.authorId),
                        { $push: { comments: createdComment } },
                    ));
            } catch (e) {
                throw new Error(
                    `User could not be updated during comment creation: ${e}`,
                );
            }
            // add to article
            try {
                createCommentDto.articleId &&
                    (await this.articleModel.findByIdAndUpdate(
                        new ObjectId(createCommentDto.articleId),
                        { $push: { comments: createdComment } },
                    ));
            } catch (e) {
                throw new Error(
                    `User could not be updated during comment creation: ${e}`,
                );
            }
            // return created comment
            return createdComment;
        } catch (e) {
            throw new Error(`Oups, comment could not be created: ${e}`);
        }
    }

    findAll() {
        try {
            return this.commentModel
                .find()
                .populate('author', 'article')
                .exec();
        } catch (e) {
            throw new Error(`Oups, comments could not be loaded: ${e}`);
        }
    }

    findOne(id: string | ObjectId) {
        try {
            return this.commentModel.findById(new ObjectId(id));
        } catch (e) {
            throw new Error(
                `Oups, comment with id ${id} could not be found: ${e}`,
            );
        }
    }

    async update(id: string | ObjectId, updateCommentDto: UpdateCommentDto) {
        try {
            // get userId from request
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            // check if user id matches with comment author's id
            const comment = await this.commentModel.findById(new ObjectId(id)).populate('author');
            if (decodedToken._id !== comment.author._id.toString()) throw new Error(`User must be authenticated and must be admin or comment's author to modify it.`);
            // update comment
            await this.commentModel.findByIdAndUpdate(
                new ObjectId(id),
                updateCommentDto,
            );
            // read updated comment
            const updatedComment = await this.commentModel
                .findById(new ObjectId(id))
                .populate('author', 'article')
                .exec();
            // return updated comment
            return updatedComment;
        } catch (e) {
            throw new Error(`Oups, comment could not be updated: ${e}`);
        }
    }

    async remove(id: string | ObjectId) {
        try {
            // get userId from request
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            // check if user id matches with comment author's id
            const comment = await this.commentModel.findById(new ObjectId(id)).populate('author');
            if (decodedToken._id !== comment.author._id.toString()) throw new Error(`User must be authenticated and must be admin or comment's author to modify it.`);
            // delete comment
            const deletedComment = await this.commentModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('author', 'article')
                .exec();
            // update user
            try {
                await this.userModel.findById(deletedComment.author);
                deletedComment.author &&
                    (await this.userModel.findByIdAndUpdate(
                        deletedComment.author._id,
                        { $pull: { comments: deletedComment._id } },
                    ));
            } catch (e) {
                throw new Error(
                    `Comment with id ${id} could not be removed from user with id ${deletedComment.author} during comment deletion: ${e}`,
                );
            }
            // update article
            try {
                deletedComment.article &&
                    (await this.articleModel.findByIdAndUpdate(
                        deletedComment.article._id,
                        { $pull: { comments: deletedComment._id } },
                    ));
            } catch (e) {
                throw new Error(
                    `Comment could not be removed from article with id ${deletedComment.article._id} during comment deletion: ${e}`,
                );
            }
            // return deleted object
            return deletedComment;
        } catch (e) {
            throw new Error(`Oups, comment could not be deleted: ${e}`);
        }
    }
}
