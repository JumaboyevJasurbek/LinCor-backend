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
  ApiBody,
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
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['userId', 'courseId'],
      properties: {
        userId: {
          type: 'string',
          default: 'asvfewgv32r3ave4gvwegewrgvrw',
        },
        courseId: {
          type: 'string',
          default: 'asvfewgv32r34gvwegewrgvrw',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'admin token',
    required: true,
  })
  async create(@Body() createTakeDto: CreateTakeDto) {
    return await this.takeServise.create(createTakeDto);
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
