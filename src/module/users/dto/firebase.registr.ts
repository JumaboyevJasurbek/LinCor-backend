import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Auth_socials } from 'src/types';

export class FirebaseRegistrDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'image',
    type: 'string',
    default:
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    required: true,
  })
  image: string;

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
