import { PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTestDto extends PartialType(CreateTestDto) {
  @IsNumber()
  sequence: number;

  @IsString()
  question: string;

  @IsString()
  option1: string;

  @IsString()
  option2: string;

  @IsString()
  option3: string;

  @IsString()
  answer: string;

  // @IsString()
  // discount: string;
}
