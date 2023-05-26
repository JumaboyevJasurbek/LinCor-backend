import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateVedioDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  sequence: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  course_id: string;
}
