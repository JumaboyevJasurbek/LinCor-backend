import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsEnum, IsEmail } from 'class-validator';
import { UserArea } from 'src/types';

export class RegistrDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: 'string',
    default: 'Toshmatbek',
    required: true,
  })
  name: string;

  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  @ApiProperty({
    name: 'lastname',
    type: 'string',
    default: 'Eshmatov',
    required: true,
  })
  lastname: string;

  @IsEnum(UserArea)
  @IsNotEmpty()
  @ApiProperty({
    name: 'area',
    type: 'enum',
    enum: UserArea,
    default: 'Toshkent',
    required: true,
  })
  area: UserArea;

  @IsEmail()
  @Length(0, 100)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    type: 'string',
    default: 'ahmadjonovakmal079@gmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    type: 'string',
    default: '1a3s4ftf',
    required: true,
  })
  password: string;
}
