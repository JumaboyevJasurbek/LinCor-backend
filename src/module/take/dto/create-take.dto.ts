import { IsNotEmpty, IsString } from "class-validator";

export class CreateTakeDto {
    @IsString()
    @IsNotEmpty()
    userId : string

    
    @IsString()
    @IsNotEmpty()
    courseId : string
}