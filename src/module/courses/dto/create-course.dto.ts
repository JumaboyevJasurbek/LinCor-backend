import { Type } from 'class-transformer';
import { IsString, Length, IsNotEmpty, IsEnum } from 'class-validator';
import { Sequence } from 'src/types';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 350)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @Type(() => Number)
  @IsEnum(Sequence)
  @IsNotEmpty()
  sequence: Sequence;
}
