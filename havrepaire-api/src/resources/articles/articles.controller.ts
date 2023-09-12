import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schemas/article.schema';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    findAll(): Promise<Article[]> {
        return this.articlesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Article> {
        return this.articlesService.findOne(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        return this.articlesService.update(id, updateArticleDto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Article> {
        return this.articlesService.remove(id);
    }
}
