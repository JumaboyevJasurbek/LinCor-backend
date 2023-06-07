import { Module } from '@nestjs/common';
import { UserDiscountService } from './user-discount.service';
import { UserDiscountController } from './user-discount.controller';

@Module({
  controllers: [UserDiscountController],
  providers: [UserDiscountService],
})
export class UserDiscountModule {}
