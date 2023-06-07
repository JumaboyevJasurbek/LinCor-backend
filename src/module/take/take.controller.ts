import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TakeServise } from './take.servise';
import { CreateTakeDto } from './dto/create-take.dto';

@ApiTags('Take')
@Controller('take')
export class TakeController {
  constructor(private readonly takeServise: TakeServise) {}

  @Post('create')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTakeDto: CreateTakeDto) {
    await this.takeServise.create(createTakeDto);
  }

  @Get('all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'admin token',
    required: true,
  })
  async findAll() {
    return await this.takeServise.findAll();
  }

  @Delete('delete/:id')
  @ApiHeader({
    name: 'autharization',
    description: 'admin token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.takeServise.delete(id);
  }
}
