import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  percentage: number;
}
