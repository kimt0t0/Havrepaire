import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IllustrationsService } from './illustrations.service';
import { CreateIllustrationDto } from './dto/create-illustration.dto';
import { UpdateIllustrationDto } from './dto/update-illustration.dto';

@Controller('illustrations')
export class IllustrationsController {
  constructor(private readonly illustrationsService: IllustrationsService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIllustrationDto: UpdateIllustrationDto) {
    return this.illustrationsService.update(id, updateIllustrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.illustrationsService.remove(id);
  }
}
