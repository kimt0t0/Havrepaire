import {
    Controller,
    Get,
    Post,
    Body,
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
import { AuthGuard } from '../../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('illustrations')
export class IllustrationsController {
    constructor(private readonly illustrationsService: IllustrationsService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @Body() createIllustrationDto: CreateIllustrationDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 32000000 }), // size limit 4Go - to calculate, convert Mb to Gb then Gb to Mo, then Mo to Go
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg|wepb)' }),
                ]
            })
        )
        file: Express.Multer.File,
    ) {
        return this.illustrationsService.create(createIllustrationDto, file);
    }

    @Get()
    findAll() {
        return this.illustrationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.illustrationsService.findOne(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.illustrationsService.remove(id);
    }
}
