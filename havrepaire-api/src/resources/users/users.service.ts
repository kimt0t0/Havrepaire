import {
    BadRequestException,
    Inject,
    Injectable,
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
// import { maskEmail2 } from 'maskdata';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Comment } from '../comments/schemas/comment.schema';
import { Like } from '../likes/schemas/like.schema';
import { Article } from '../articles/schemas/article.schema';
import { decodeToken } from 'src/utils/token.utils';
import { Role } from './enums/role.enum';
import { RemoveUserDto } from './dto/remove-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject(REQUEST) private request,
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Article.name)
        private articleModel: Model<Article>,
        @InjectModel(Comment.name)
        private commentModel: Model<Comment>,
        @InjectModel(Like.name)
        private likeModel: Model<Like>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const {
                username,
                password,
                email,
                gender,
                pronouns,
                role
            } = createUserDto;
            if (role === Role.ADMIN) throw new NotAcceptableException(`You cannot create an admin account. If you need one please contact the developer.`);
            const hash = await bcrypt.hash(password, 15);
            // const maskedEmail = maskEmail2(email);
            // masking email caused index mistaken errors in db
            const userData = {
                username,
                hash,
                email,
                gender,
                pronouns,
                role
            };
            const user = new this.userModel(userData);
            let createdUser = await user.save();
            if (!user)
                throw new BadRequestException(
                    createdUser,
                    `User could not be created !`,
                );
            delete createdUser.hash;
            delete createdUser.email;
            delete createdUser.id;
            return createdUser;
        } catch (e) {
            throw new Error(`Oups, user could not be created: ${e}`);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return this.userModel
                .find()
                .select('-hash')
                .select('-email')
                .select('-id')
                .populate('likes', 'comments')
                .exec();
        } catch (e) {
            throw new Error(`Oups, users could not be loaded: ${e}`);
        }
    }

    async findOne(id: string | ObjectId): Promise<User> {
        try {
            const user = await this.userModel
                .findById(new ObjectId(id))
                .select('-hash')
                .select('-email')
                .select('-id')
                .populate('comments', 'likes')
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
            // check authenticated user
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            const authenticatedUser = await this.userModel
                .findById(
                    new ObjectId(decodedToken._id)
                )
                .populate('role')
                .select('-email');
            if (authenticatedUser.role !== Role.ADMIN && authenticatedUser._id.toString() !== id) throw new UnauthorizedException('A user account can be updated only by its owner or an admin account.');
            // check password
            const isPasswordMatch = await bcrypt.compare(updateUserDto.password, authenticatedUser.hash);
            if (!isPasswordMatch) throw new NotAcceptableException('User password does not match');
            // update user password if new password
            let newHash: string;
            if (updateUserDto.newPassword) {
                newHash = await bcrypt.hash(updateUserDto.newPassword, 15);
                await this.userModel
                    .findByIdAndUpdate(new ObjectId(id), { hash: newHash })
                    .exec()
            }
            // update user's other data
            await this.userModel
                .findByIdAndUpdate(new ObjectId(id), updateUserDto)
                .exec();
            const updatedUser = await this.userModel
                .findById(new ObjectId(id))
                .select('-hash')
                .select('-email')
                .select('-id')
                .exec();
            return updatedUser;
        } catch (e) {
            throw new Error(`Oups, user with id ${id} could not be updated: ${e}`);
        }
    }

    async remove(id: string | ObjectId, removeUserDto: RemoveUserDto): Promise<User> {
        const {
            userEmail,
            userPassword
        } = removeUserDto;
        if (!userEmail) throw new NotAcceptableException(`User must enter their email address to delete their account.`);
        if (!userPassword) throw new NotAcceptableException(`User must enter their password to delete their account`);
        try {
            // check if authenticated user is an admin or user themselves
            const request = this.request;
            const token = request.rawHeaders.find(header => header.startsWith('Bearer ')).replace('Bearer ', '').replace(' ', '');
            const decodedToken = decodeToken(token);
            const authenticatedUser: User = await this.userModel.findById(new ObjectId(decodedToken._id)).populate('role').exec();
            if (authenticatedUser.role !== Role.ADMIN && decodedToken._id !== id) throw new UnauthorizedException('You are not allowed to remove this account. An account can be removed only by its owner or an admin account.');
            // check credentials...
            const isPasswordMatch = await bcrypt.compare(userPassword, authenticatedUser.hash);
            if (!isPasswordMatch) throw new NotAcceptableException('User password does not match');
            const isEmailMatch = (userEmail === authenticatedUser.email);
            if (!isEmailMatch) throw new NotAcceptableException('User email does not match');
            // delete user
            const deletedUser = await this.userModel
                .findByIdAndDelete(new ObjectId(id))
                .select('-hash')
                .select('-email')
                .select('-id')
                .populate('comments', 'likes')
                .exec();
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
            // delete likes
            try {
                if (deletedUser.likes) {
                    for (const like of deletedUser.likes) {
                        const deletedLike = await this.likeModel
                            .findByIdAndDelete(like._id)
                            .populate('article')
                            .exec();
                        if (!deletedLike)
                            throw new Error(
                                `Like with id ${like._id} was not found`,
                            );
                        try {
                            await this.articleModel
                                .findByIdAndUpdate(deletedLike.article._id, {
                                    $pull: { likes: deletedLike._id },
                                })
                                .populate('likes')
                                .exec();
                        } catch (e) {
                            throw new Error(
                                `Oups, like with id ${like._id}could not be removed from article with id ${deletedLike.article._id}:${e}`,
                            );
                        }
                    }
                }
            } catch (e) {
                throw new Error(
                    `Oups, user's likes could not be deleted: ${e}`,
                );
            }
            return deletedUser;
        } catch (e) {
            throw new Error(`Oups, user could not be deleted: ${e}`);
        }
    }
}
