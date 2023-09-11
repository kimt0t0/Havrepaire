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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comment.schema';
import { AuthGuard } from '../auth/auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
        return this.commentsService.update(id, updateCommentDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.remove(id);
    }
}
