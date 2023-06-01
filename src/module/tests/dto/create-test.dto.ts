import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Answer } from 'src/types';

export class CreateTestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'sequence',
    type: 'number',
    default: 1,
    required: true,
  })
  sequence: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'question',
    type: 'string',
    default: 'qwerty',
    required: true,
  })
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'option1',
    type: 'string',
    default: 'qwerty-1',
    required: true,
  })
  option1: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'option2',
    type: 'string',
    default: 'qwerty-2',
    required: true,
  })
  option2: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'option3',
    type: 'string',
    default: 'qwerty-3',
    required: true,
  })
  option3: string;

  @ApiProperty({
    name: 'answer',
    type: 'string',
    default: 'a',
    required: true,
  })
  @IsEnum(Answer)
  answer: Answer;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'discount',
    type: 'string',
    default: '94a405af-2a69-4d9b-8da5-67b3e46b1923',
    required: true,
  })
  discount: any;
}
