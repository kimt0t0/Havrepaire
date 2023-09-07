import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './schemas/article.schema';
import { User } from '../users/schemas/user.schema';
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
    try {
      const article = new this.articleModel(createArticleDto);
      const createdArticle = await article.save();
      return createdArticle;
    } catch (e) {
      throw new Error (`Article could not be created: ${e}`);
    }
  }

  findAll() {
    try {
      return this.articleModel.find().exec();
    } catch (e) {
      throw new Error (`Oups, could not load articles: ${e}`);
    }
  }

  async findOne(id: string) {
    try {
      const article = await this.articleModel.findById(new ObjectId(id)).exec();
      if (!article) throw new NotFoundException(`Article with id ${id} was not found !`);
      return article;
    } catch (e) {
      throw new Error (`Oups, could not find article: ${e}`);
    }
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      await this.articleModel.findByIdAndUpdate(new ObjectId(id), updateArticleDto).exec();
      const updatedArticle = await this.articleModel.findById(new ObjectId(id)).populate('illustration').exec();
      return updatedArticle;
    } catch (e) {
      throw new Error(`Oups, article could not be updated: ${e}`);
    }
  }

  async remove(id: string) {
    try {
      const deletedArticle = await this.articleModel.findByIdAndDelete(new ObjectId(id)).exec();
      return deletedArticle;
    } catch (e) {
      throw new Error (`Oups, article could not be deleted: ${e}`);
    }
  }
}
