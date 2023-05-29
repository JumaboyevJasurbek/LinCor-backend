import { PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
  @IsNumber()
  percentage: number;

  @IsString()
  course_id: string;
}
