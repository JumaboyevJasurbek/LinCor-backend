import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { UserDiscountService } from './user-discount.service';
import { CreateUserDiscountDto } from './dto/create-user-discount.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@Controller('user-discount')
@ApiTags('User Discount tests')
export class UserDiscountController {
  constructor(private readonly userDiscountService: UserDiscountService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiHeader({
    name: 'discount',
    description: 'Discount id',
    required: true,
  })
  async create(
    @Body() body: CreateUserDiscountDto,
    @Req() req: Request,
    @Headers() discount: string,
  ) {
    return await this.userDiscountService.create(body, discount, req.user_id);
  }
}
