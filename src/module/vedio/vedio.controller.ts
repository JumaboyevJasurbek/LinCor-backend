import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VedioService } from './vedio.service';
import { CreateVedioDto } from './dto/create-vedio.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';

@Controller('vedio')
export class VedioController {
  constructor(private readonly vedioService: VedioService) {}

  @Post()
  create(@Body() createVedioDto: CreateVedioDto) {
    return this.vedioService.create(createVedioDto);
  }

  @Get()
  findAll() {
    return this.vedioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vedioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVedioDto: UpdateVedioDto) {
    return this.vedioService.update(+id, updateVedioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vedioService.remove(+id);
  }
}
