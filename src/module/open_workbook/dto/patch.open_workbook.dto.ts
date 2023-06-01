import { IsString, Length } from 'class-validator';

export class PatchOpenWorkbookDto {
  @IsString()
  @Length(0, 100)
  vidio_id: string;
}
