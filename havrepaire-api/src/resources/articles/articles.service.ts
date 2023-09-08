import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = new this.articleModel(createArticleDto);
      const createdArticle = await article.save();
      return createdArticle;
    } catch (e) {
      throw new Error (`Oups, article could not be created: ${e}`);
    }
  }

  findAll() {
    try {
      return this.articleModel.find().populate('illustration', 'comments').exec();
    } catch (e) {
      throw new Error (`Oups, articles could not be loaded: ${e}`);
    }
  }

  findOne(id: string|ObjectId) {
    try {
      return this.articleModel.findById(new ObjectId(id)).populate('illustration', 'comments').exec();
    } catch (e) {
      throw new Error (`Oups, article could not be found: ${e}`);
    }
  }

  async update(id: string|ObjectId, updateArticleDto: UpdateArticleDto) {
    try {
      await this.articleModel.findByIdAndUpdate(new ObjectId(id), updateArticleDto).exec();
      const updatedArticle = await this.articleModel.findById(new ObjectId(id)).populate('illustration').exec();
      return updatedArticle;
    } catch (e) {
      throw new Error(`Oups, article could not be updated: ${e}`);
    }
  }

  async remove(id: string|ObjectId) {
    try {
      const deletedArticle = await this.articleModel.findByIdAndDelete(new ObjectId(id)).exec();
      return deletedArticle;
    } catch (e) {
      throw new Error (`Oups, article could not be deleted: ${e}`);
    }
  }
}
