import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsString()
  course_id: string;
}
