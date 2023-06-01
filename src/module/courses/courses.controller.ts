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
  UploadedFile,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'description', 'price', 'sequence', 'file'],
      properties: {
        title: {
          type: 'string',
          default: 'Korees tili boshlang`ich kursi',
        },
        description: {
          type: 'string',
          default: 'Bu korees tilini o`rganishni boshlaganlar uchun',
        },
        price: {
          type: 'string',
          default: '120 000',
        },
        sequence: {
          default: 1,
        },

        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance in Punch In' })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'autharization',
    description: 'Admin Token',
    required: true,
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      await this.coursesService.create(createCourseDto, file as any);
    }
  }

  @Get('/all')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get('one/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User Token',
    required: false,
  })
  async findOne(@Param('id') id: string, @Headers() header: any) {
    return await this.coursesService.findOne(id, header);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Korees tili boshlang`ich kursi',
        },
        description: {
          type: 'string',
          default: 'Bu korees tilini o`rganishni boshlaganlar uchun',
        },
        price: {
          type: 'string',
          default: '120 000',
        },
        sequence: {
          type: 'Sequence',
          default: 1,
        },
        file: {
          type: 'string' || undefined,
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance in Punch In' })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'autharization',
    description: 'Admin Token',
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.coursesService.update(id, dto, file);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'autharization',
    description: 'Admin Token',
    required: true,
  })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiForbiddenResponse()
  async remove(@Param('id') id: string) {
    await this.coursesService.remove(id);
  }
}
