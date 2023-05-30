import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('tests')
@ApiTags('Tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sequence: {
          type: 'number',
          default: 123,
        },
        question: {
          type: 'string',
          default: 'qwerty',
        },
        option1: {
          type: 'string',
          default: 'qwerty',
        },
        option2: {
          type: 'string',
          default: 'qwerty',
        },
        option3: {
          type: 'string',
          default: 'qwerty',
        },
        answer: {
          type: 'string',
          default: 'a',
        },
        discount: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
      },
    },
  })
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @Get('user')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findUser(@Param('id') user: string) {
    return this.testsService.findUser(user);
  }
  @Get('admin')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findAdmin(@Param('id') user: string) {
    return this.testsService.findAdmin(user);
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
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sequence: {
          type: 'number',
          default: 123,
        },
        question: {
          type: 'string',
          default: 'qwerty',
        },
        option1: {
          type: 'string',
          default: 'qwerty',
        },
        option2: {
          type: 'string',
          default: 'qwerty',
        },
        option3: {
          type: 'string',
          default: 'qwerty',
        },
        answer: {
          type: 'string',
          default: 'a',
        },
        discount: {
          type: 'string',
          default: '3b90396f-1761-472c-836f-f3a1d6095494',
        },
      },
    },
  })
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.testsService.remove(id);
  }
}
