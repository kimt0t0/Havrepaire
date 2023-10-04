import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    UseInterceptors,
} from '@nestjs/common';
import { IllustrationsService } from './illustrations.service';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('illustrations')
export class IllustrationsController {
    constructor(private readonly illustrationsService: IllustrationsService) { }

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Body() createIllustrationDto: CreateIllustrationDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 4000000 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                ]
            })
        )
        file: Express.Multer.File,
    ) {
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
