import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Auth_socials } from 'src/types';

export class FirebaseLoginDto {
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

  @IsEnum(Auth_socials)
  @IsNotEmpty()
  @ApiProperty({
    name: 'auth_socials',
    type: 'enum',
    enum: Auth_socials,
    default: 'github',
    required: true,
  })
  auth_socials: Auth_socials;
}
