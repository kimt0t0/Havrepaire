import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './schemas/like.schema';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

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

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Like> {
        return this.likesService.remove(id);
    }
}
