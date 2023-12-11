import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
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
