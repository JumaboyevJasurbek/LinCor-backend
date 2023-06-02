import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import {
  IsString,
  Length,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Sequence } from 'src/types';
import { Type } from 'class-transformer';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  @Length(1, 100)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  sequence: Sequence;
}
