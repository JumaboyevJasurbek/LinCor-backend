import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiHeader } from '@nestjs/swagger';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findAll() {
    return this.discountService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
