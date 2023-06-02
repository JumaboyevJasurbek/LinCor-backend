import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { UpdateTakeDto } from './dto/update-take.dto';

@ApiTags('Take')
@Controller('take')
export class TakeController {
  constructor(private readonly takeServise: TakeServise) {}

  @Post('add')
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
    description: 'token',
    required: true,
  })
  create(@Body() createTakeDto: CreateTakeDto) {
    return this.takeServise.create(createTakeDto);
  }

  @Get('all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findAll() {
    return this.takeServise.findAll();
  }

  @Get(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.takeServise.findOne(id);
  }

  @Delete('delete/:id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.takeServise.delete(id);
  }
}
