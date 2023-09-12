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
import { IllustrationsService } from './illustrations.service';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('illustrations')
export class IllustrationsController {
    constructor(private readonly illustrationsService: IllustrationsService) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createIllustrationDto: CreateIllustrationDto) {
        return this.illustrationsService.create(createIllustrationDto);
    }

    @Get()
    findAll() {
        return this.illustrationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.illustrationsService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateIllustrationDto: UpdateIllustrationDto,
    ) {
        return this.illustrationsService.update(id, updateIllustrationDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.illustrationsService.remove(id);
    }
}
