import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateVedioDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  title: string;

  @IsNumber() 
  @IsNotEmpty()
  sequence: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  course_id: string;
}
