import { IsString } from "class-validator";

export class UpdateTakeDto {
    @IsString()
    courseId: string

    @IsString()
    userId: string
}