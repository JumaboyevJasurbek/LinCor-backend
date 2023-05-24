import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateVedioDto {
  @IsString()
  @Length(0, 100)
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  sequence: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  course_id: string;
}
