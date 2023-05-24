import { PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';
import { IsNumber } from 'class-validator';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
  @IsNumber()
  percentage: number;
}
