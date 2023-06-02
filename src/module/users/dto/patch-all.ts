import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class PatchUserDto {
  @IsString()
  @ApiProperty({
    name: 'first_name',
    type: 'string',
    default: 'Eshmat',
    required: true,
  })
  @Length(0, 65)
  @IsOptional()
  first_name: string;

  @IsString()
  @Length(0, 65)
  @IsOptional()
  @ApiProperty({
    name: 'last_name',
    type: 'string',
    default: 'Toshmatov',
    required: false,
  })
  last_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'area',
    type: 'string',
    default: 'Toshkent',
    required: false,
  })
  area: string;

  @IsString()
  @Length(0, 65)
  @IsOptional()
  @ApiProperty({
    name: 'phone',
    type: 'string',
    default: '90 823 03 05',
    required: false,
  })
  phone: string;
}
