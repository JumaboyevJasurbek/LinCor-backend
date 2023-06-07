import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TakeServise } from './take.servise';
import { CreateTakeDto } from './dto/create-take.dto';

@Controller('take')
@ApiTags('Take')
export class TakeController {
  constructor(private readonly takeServise: TakeServise) {}

  @Post('create')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTakeDto: CreateTakeDto) {
    await this.takeServise.create(createTakeDto);
  }
}
