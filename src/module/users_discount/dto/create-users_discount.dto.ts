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

export class CreateUsersDiscountDto1 {
  @IsBoolean()
  win: boolean;

  // @IsString()
  discount: any;

  // @IsString()
  user: any;

  // answer: any;
}
