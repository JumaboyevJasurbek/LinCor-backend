import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CourseEntity } from 'src/entities/course.entity';
import { Discount } from 'src/entities/discount.entity';
import { DeepPartial } from 'typeorm';

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  // @IsString()
  course_id: any | string;
}
