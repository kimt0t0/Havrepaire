import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Illustration } from '../illustrations/schemas/illustration.schema';
import { Comment } from '../comments/schemas/comment.schema';
import { Like } from '../likes/schemas/like.schema';
import { Article } from '../articles/schemas/article.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
        @InjectModel(Illustration.name)
        private illustrationModel: Model<Illustration>,
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>,
        @InjectModel(Like.name)
        private likeModel: Model<Like>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = new this.userModel(createUserDto);
            const createdUser = await user.save();
            if (!user)
                throw new BadRequestException(
                    createdUser,
                    `User could not be created !`,
                );
            return createdUser;
        } catch (e) {
            throw new Error(`Oups, user could not be created: ${e}`);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return this.userModel.find().populate('avatar', 'comments').exec();
        } catch (e) {
            throw new Error(`Oups, users could not be loaded: ${e}`);
        }
    }

    async findOne(id: string | ObjectId): Promise<User> {
        try {
            const user = await this.userModel
                .findById(new ObjectId(id))
                .populate('avatar', 'comments')
                .exec();
            if (!user)
                throw new NotFoundException(
                    `User with id ${id} was not found !`,
                );
            return user;
        } catch (e) {
            throw new Error(`Oups, user could not be found: ${e}`);
        }
    }

    async update(
        id: string | ObjectId,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        try {
            await this.userModel
                .findByIdAndUpdate(new ObjectId(id), updateUserDto)
                .exec();
            const updatedUser = await this.userModel
                .findById(new ObjectId(id))
                .exec();
            return updatedUser;
        } catch (e) {
            throw new Error(`Oups, user could not be updated: ${e}`);
        }
    }

    async remove(id: string | ObjectId): Promise<User> {
        try {
            const deletedUser = await this.userModel
                .findByIdAndDelete(new ObjectId(id))
                .populate('avatar', 'comments')
                .exec();
            // delete avatar
            try {
                deletedUser.avatar &&
                    (await this.illustrationModel
                        .findByIdAndDelete(new ObjectId(deletedUser.avatar._id))
                        .exec());
            } catch (e) {
                throw new Error(
                    `Illustration could not be deleted during user deletion: ${e}`,
                );
            }
            // delete comments
            try {
                if (deletedUser.comments) {
                    for (const comment of deletedUser.comments) {
                        const deletedComment = await this.commentModel
                            .findByIdAndDelete(comment._id)
                            .populate('article')
                            .exec();
                        if (!deletedComment)
                            throw new Error(
                                `Comment with id ${comment._id} was not found`,
                            );
                        try {
                            await this.articleModel
                                .findByIdAndUpdate(deletedComment.article._id, {
                                    $pull: { comments: deletedComment._id },
                                })
                                .populate('comments')
                                .exec();
                        } catch (e) {
                            throw new Error(
                                `Oups, comment with id ${comment._id}could not be removed from article with id ${deletedComment.article._id}:${e}`,
                            );
                        }
                    }
                }
            } catch (e) {
                throw new Error(
                    `Oups, user's comments could not be deleted: ${e}`,
                );
            }
            return deletedUser;
        } catch (e) {
            throw new Error(`Oups, user could not be deleted: ${e}`);
        }
    }
}
