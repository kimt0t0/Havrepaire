import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Article } from './schemas/article.schema';
import { User } from '../users/schemas/user.schema';
import { Illustration } from '../illustrations/schemas/illustration.schema';
import { Like } from '../likes/schemas/like.schema';
import { Comment } from '../comments/schemas/comment.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Illustration.name)
    private illustrationModel: Model<Illustration>,
    @InjectModel(Like.name)
    private likeModel: Model<Like>,
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    return `This action creates an article`;
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
