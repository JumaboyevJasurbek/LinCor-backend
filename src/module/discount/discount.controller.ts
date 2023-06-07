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
import { ApiHeader, ApiTags } from '@nestjs/swagger';

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
    await this.discountService.create(createDiscountDto);
  }

  // ? FIND ALL
  @Get()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async findAll() {
    return await this.discountService.findAll();
  }

  // ? UPDATE
  @Patch(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    await this.discountService.update(id, updateDiscountDto);
  }

  // ? DELETE
  @Delete(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async remove(@Param('id') id: string) {
    await this.discountService.remove(id);
  }
}
