import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'percentage',
    type: 'number',
    default: 20,
  })
  percentage: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'course_id',
    type: 'string',
    default: '02d0de60-462b-42a8-b9f3-e46d52c910e1',
  })
  course_id: any;
}
