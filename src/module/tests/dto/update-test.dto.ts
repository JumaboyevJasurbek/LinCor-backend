import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Answer } from 'src/types';

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'sequence',
    type: 'number',
    default: 1,
  })
  sequence: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'question',
    type: 'string',
    default: 'qwerty',
  })
  question: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'option1',
    type: 'string',
    default: 'qwerty-1',
  })
  option1: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'option2',
    type: 'string',
    default: 'qwerty-2',
  })
  option2: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'option3',
    type: 'string',
    default: 'qwerty-3',
  })
  option3: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'answer',
    type: 'string',
    default: 'a',
  })
  @IsEnum(Answer)
  answer: Answer;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'discount',
    type: 'string',
    default: '94a405af-2a69-4d9b-8da5-67b3e46b1923',
  })
  discount: any;
}
