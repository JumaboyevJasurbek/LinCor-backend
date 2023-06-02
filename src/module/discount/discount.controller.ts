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
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('discount')
@ApiTags('Discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  // ? CREATE
  @Post()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return await this.discountService.create(createDiscountDto);
  }

  // ? FIND ALL
  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  findAll() {
    return this.discountService.findAll();
  }

  // ? FIND ONE
  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  // ? UPDATE
  @Patch(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(id, updateDiscountDto);
  }

  // ? DELETE
  @Delete(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
