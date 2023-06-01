import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CourseEntity } from 'src/entities/course.entity';
import { Discount } from 'src/entities/discount.entity';
import { DeepPartial } from 'typeorm';

export class CreateDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'percentage',
    type: 'number',
    default: 20,
    required: true,
  })
  percentage: number;

  @IsString()
  @ApiProperty({
    name: 'course_id',
    type: 'string',
    default: '02d0de60-462b-42a8-b9f3-e46d52c910e1',
    required: true,
  })
  course_id: any | string;
}
