import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { TakeServise } from "./take.servise";
import { CreateTakeDto } from "./dto/create-take.dto";

@Controller('take')
export class TakeController {
    constructor (private readonly takeServise : TakeServise) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          default: 'asvfewgv32r3ave4gvwegewrgvrw',
        },
        courseId: {
          type: 'string',
          default: 'asvfewgv32r34gvwegewrgvrw',
        } 
      },
    },
  })
  create(@Body() createTakeDto:CreateTakeDto) {
    return this.takeServise.create(createTakeDto) ;
  }
}