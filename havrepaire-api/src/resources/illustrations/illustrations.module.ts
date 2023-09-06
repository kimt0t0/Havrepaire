import { Module } from '@nestjs/common';
import { IllustrationsService } from './illustrations.service';
import { IllustrationsController } from './illustrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Illustration } from './entities/illustration.entity';
import { User } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Illustration, User, Article])],
  controllers: [IllustrationsController],
  providers: [IllustrationsService],
})
export class IllustrationsModule {}
