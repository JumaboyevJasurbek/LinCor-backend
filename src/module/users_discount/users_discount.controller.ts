import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersDiscountService } from './users_discount.service';
import { CreateUsersDiscountDto } from './dto/create-users_discount.dto';
import { UpdateUsersDiscountDto } from './dto/update-users_discount.dto';

@Controller('users-discount')
export class UsersDiscountController {
  constructor(private readonly usersDiscountService: UsersDiscountService) {}

  @Post()
  create(@Body() createUsersDiscountDto: CreateUsersDiscountDto) {
    return this.usersDiscountService.create(createUsersDiscountDto);
  }

  @Get()
  findAll() {
    return this.usersDiscountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersDiscountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersDiscountDto: UpdateUsersDiscountDto) {
    return this.usersDiscountService.update(id, updateUsersDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersDiscountService.remove(id);
  }
}
