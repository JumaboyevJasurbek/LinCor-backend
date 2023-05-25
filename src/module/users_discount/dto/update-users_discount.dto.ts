import { PartialType } from '@nestjs/swagger';
import { CreateUsersDiscountDto } from './create-users_discount.dto';
import { IsBoolean } from 'class-validator';

export class UpdateUsersDiscountDto extends PartialType(
  CreateUsersDiscountDto,
) {
  @IsBoolean()
  win: boolean;
}
