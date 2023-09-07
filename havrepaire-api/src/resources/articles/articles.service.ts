import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './schemas/article.schema';
import { User } from '../users/schemas/user.schema';
import { Illustration } from '../illustrations/schemas/illustration.schema';
import { Like } from '../likes/schemas/like.schema';
import { Comment } from '../comments/schemas/comment.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    // create and save new article
    const article = new this.articleModel(createArticleDto);
    const createdArticle = await article.save();
    // update user
    await this.userModel.findByIdAndUpdate(new ObjectId(createArticleDto.authorId), { '$push': { 'articleIds': createdArticle }});
    // check result
    if (!article) throw new BadRequestException(createdArticle, `Article could not be created !`);
    return createdArticle
  }

  findAll() {
    return this.articleModel.find().exec();
  }

  async findOne(id: string) {
    const article = await this.articleModel.findById(new ObjectId(id)).exec();
    if (!article) throw new NotFoundException(`Article with id ${id} was not found !`);
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    await this.articleModel.findByIdAndUpdate(new ObjectId(id), updateArticleDto).exec();
    const updatedArticle = await this.articleModel.findById(new ObjectId(id)).exec();
    return updatedArticle;
  }

  async remove(id: string) {
    const deletedArticle = await this.articleModel.findByIdAndDelete(new ObjectId(id)).exec();
    // update user
    await this.userModel.findByIdAndUpdate(new ObjectId(deletedArticle.authorId), { '$pop': { 'articles': new ObjectId(id)}});
    return deletedArticle;
  }
}
