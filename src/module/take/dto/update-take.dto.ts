import { IsBoolean, IsString } from 'class-validator';

export class UpdateTakeDto {
  @IsBoolean()
  active: boolean;

  @IsString()
  courseId: string;

  @IsString()
  userId: string;
}
