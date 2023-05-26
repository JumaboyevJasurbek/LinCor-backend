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
import { ApiBody, ApiHeader } from '@nestjs/swagger';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        percentage: {
          type: 'number',
          default: 20,
        },
        course_id: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
      },
    },
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        percentage: {
          type: 'number',
          default: 20,
        },
        course_id: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
      },
    },
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
