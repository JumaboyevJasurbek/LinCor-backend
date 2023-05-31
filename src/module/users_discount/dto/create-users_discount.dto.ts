import { IsBoolean, IsString } from 'class-validator';

export class CreateUsersDiscountDto {
  @IsBoolean()
  win: boolean;

  // @IsString()
  discount: any;

  // @IsString()
  user: any;

  // answer: any;
}
