import { Module } from '@nestjs/common';
import { UsersDiscountService } from './users_discount.service';
import { UsersDiscountController } from './users_discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakenDiscount } from 'src/entities/taken_discount';

@Module({
  imports: [TypeOrmModule.forFeature([TakenDiscount])],
  controllers: [UsersDiscountController],
  providers: [UsersDiscountService],
})
export class UsersDiscountModule {}
