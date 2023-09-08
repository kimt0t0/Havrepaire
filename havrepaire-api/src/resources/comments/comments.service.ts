import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { User } from '../users/schemas/user.schema';
import { Article } from '../articles/schemas/article.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = new this.commentModel(createCommentDto);
      const createdComment = await comment.save();
      // add to user
      try {
        createCommentDto.authorId && await this.userModel.findByIdAndUpdate(new ObjectId(createCommentDto.authorId), {'$push': {'comments': createdComment}});
      } catch (e) {
        throw new Error (`User could not be updated during comment creation: ${e}`);
      }
      // add to article
      try {
        createCommentDto.articleId && await this.articleModel.findByIdAndUpdate(new ObjectId(createCommentDto.articleId), {'$push': {'comments': createdComment}});
      } catch (e) {
        throw new Error (`User could not be updated during comment creation: ${e}`);
      }
      // return created comment
      return createdComment;
    } catch (e) {
      throw new Error (`Oups, comment could not be created: ${e}`);
    }
  }

  findAll() {
    try {
      return this.commentModel.find().populate('author', 'article').exec();
    } catch (e) {
      throw new Error (`Oups, comments could not be loaded: ${e}`);
    }
  }

  findOne(id: string|ObjectId) {
    try  {
      return this.commentModel.findById(new ObjectId(id));
    } catch (e) {
      throw new Error (`Oups, comment could not be found: ${e}`);
    }
  }

  async update(id: string|ObjectId, updateCommentDto: UpdateCommentDto) {
    try {
      // update and read comment
      await this.commentModel.findByIdAndUpdate(new ObjectId(id), updateCommentDto);
      const updatedComment = await this.commentModel.findById(new ObjectId(id));
      // add to user
      try {
        updateCommentDto.authorId && await this.userModel.findByIdAndUpdate(new ObjectId(updateCommentDto.authorId), {'$push': {'comments': updatedComment}});
      } catch (e) {
        throw new Error (`User could not be updated during comment update: ${e}`);
      }
      // add to article
      try {
        updateCommentDto.articleId && await this.articleModel.findByIdAndUpdate(new ObjectId(updateCommentDto.articleId), {'$push': {'comments': updatedComment}});
      } catch (e) {
        throw new Error (`User could not be updated during comment update: ${e}`);
      }
      // return updated comment
      return updatedComment;
    } catch (e) {
      throw new Error(`Oups, comment could not be updated: ${e}`);
    }
  }

  async remove(id: string|ObjectId) {
    try {
      const deletedComment = await this.commentModel.findByIdAndDelete(new ObjectId(id)).populate('author', 'article').exec();
      // update user
      try {
        deletedComment.author && await this.userModel.findByIdAndUpdate(deletedComment.author._id, {'$delete': {'comments': deletedComment}});
      } catch (e) {
        throw new Error (`Comment could not be removed from user with id ${deletedComment.author._id} during comment deletion: ${e}`);
      }
      // update article
      try {
        deletedComment.article && await this.articleModel.findByIdAndUpdate(deletedComment.article._id, {'$delete': {'comments': deletedComment}});
      } catch (e) {
        throw new Error (`Comment could not be removed from user with id ${deletedComment.article._id} during comment deletion: ${e}`);
      }
      // return deleted object
      return deletedComment;
    } catch (e) {
      throw new Error(`Oups, comment could not be deleted: ${e}`);
    }
  }
}
