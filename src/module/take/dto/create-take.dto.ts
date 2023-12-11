import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTakeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'userId',
    default: '56e9b9b2-4c69-4dde-81ab-5173c6e1a2f1',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'courseId',
    default: '20133b8c-7237-43a8-b087-6f068a117601',
  })
  courseId: string;
}
