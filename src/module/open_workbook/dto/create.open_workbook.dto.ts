import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOpenWorkbookDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  vidio_id: string;
}
