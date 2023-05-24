import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FirebaseDto {
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
    name: 'email',
    type: 'string',
    default: 'eshmatbektoshmatov@gmail.com',
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
}
