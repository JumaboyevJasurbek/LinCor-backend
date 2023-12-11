import {
  Controller,
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
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tests')
@ApiTags('Tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async create(@Body() createTestDto: CreateTestDto) {
    await this.testsService.create(createTestDto);
  }

  @Patch(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    await this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async remove(@Param('id') id: string) {
    await this.testsService.remove(id);
  }
}
