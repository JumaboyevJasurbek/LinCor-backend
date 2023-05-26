import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTopikDto {
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
  topik_id: string;
}
