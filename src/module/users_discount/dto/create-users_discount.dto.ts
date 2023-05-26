import { IsBoolean, IsString } from 'class-validator';

export class CreateUsersDiscountDto {
  @IsBoolean()
  win: boolean;

  @IsString()
  discount: string;

  @IsString()
  user: string;
}
