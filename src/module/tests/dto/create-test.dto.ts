import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  @IsNotEmpty()
  sequence: number;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  option1: string;

  @IsString()
  @IsNotEmpty()
  option2: string;

  @IsString()
  @IsNotEmpty()
  option3: string;

  answer: string;

  @IsNotEmpty()
  @IsString()
  discount: string;
}
