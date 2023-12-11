import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class PasswordDto {
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
}
