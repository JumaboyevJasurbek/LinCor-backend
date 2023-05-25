import { IsBoolean } from 'class-validator';

export class CreateUsersDiscountDto {
  @IsBoolean()
  win: boolean;
}
