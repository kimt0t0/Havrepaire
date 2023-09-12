import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './schemas/like.schema';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createLikeDto: CreateLikeDto): Promise<Like> | null {
        return this.likesService.create(createLikeDto);
    }

    @Get()
    findAll(): Promise<Like[]> {
        return this.likesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Like> {
        return this.likesService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Like> {
        return this.likesService.remove(id);
    }
}
