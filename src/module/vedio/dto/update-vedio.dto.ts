import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateVedioDto {
  @IsString()
  @Length(0, 100)
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  sequence: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  course_id: string;

  @IsString()
  @IsOptional()
  topik_id: string;
}
