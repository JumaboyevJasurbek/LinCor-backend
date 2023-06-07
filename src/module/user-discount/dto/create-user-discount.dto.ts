import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Tests } from 'src/types';
export class CreateUserDiscountDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  @ApiProperty({
    example: [
      {
        id: 'uuid',
        sequence: 1,
        selectedAnswer: 'a',
      },
      {
        id: 'uuid',
        sequence: 2,
        selectedAnswer: 'b',
      },
      {
        id: 'uuid',
        sequence: 3,
        selectedAnswer: 'c',
      },
      {
        id: 'uuid',
        sequence: 4,
        selectedAnswer: 'a',
      },
      ,
      {
        id: 'uuid',
        sequence: 5,
        selectedAnswer: 'b',
      },
      ,
      {
        id: 'uuid',
        sequence: 6,
        selectedAnswer: 'c',
      },
      ,
      {
        id: 'uuid',
        sequence: 7,
        selectedAnswer: 'a',
      },
      ,
      {
        id: 'uuid',
        sequence: 8,
        selectedAnswer: 'b',
      },
      ,
      {
        id: 'uuid',
        sequence: 9,
        selectedAnswer: 'c',
      },
      ,
      {
        id: 'uuid',
        sequence: 10,
        selectedAnswer: 'a',
      },
    ],
    format: 'Array',
    required: true,
  })
  tests: Tests[];
}
