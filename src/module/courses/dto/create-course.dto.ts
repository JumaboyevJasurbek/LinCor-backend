import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 350)
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    price: string

    @IsString()
    @IsNotEmpty()
    sequency: number
}
