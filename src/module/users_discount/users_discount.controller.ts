import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersDiscountService } from './users_discount.service';
import { CreateUsersDiscountDto } from './dto/create-users_discount.dto';
import { UpdateUsersDiscountDto } from './dto/update-users_discount.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('users-discount')
@ApiTags('User discount')
export class UsersDiscountController {
  constructor(private readonly usersDiscountService: UsersDiscountService) {}

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
        win: {
          type: 'boolean',
          default: false,
        },
        discount: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
        user: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
        // answer: {
        //   type: 'string',
        //   default: 'b',
        // },
      },
    },
  })
  create(
    @Body() createUsersDiscountDto: CreateUsersDiscountDto,
    @Req() req: Request,
  ) {
    return this.usersDiscountService.create(
      createUsersDiscountDto,
      // req.user_id,
    );
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
    return this.usersDiscountService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.usersDiscountService.findOne(id);
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
        win: {
          type: 'boolean',
          default: false,
        },
        discount: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
        user: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateUsersDiscountDto: UpdateUsersDiscountDto,
  ) {
    return this.usersDiscountService.update(id, updateUsersDiscountDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.usersDiscountService.remove(id);
  }
}
