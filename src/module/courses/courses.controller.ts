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
  Request,
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
import { googleCloud } from 'src/utils/google-cloud';
import { tokenUtils } from 'src/utils/token.utils';
import { Sequence } from 'src/types';

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
    const img_link: string = googleCloud(file);
    if (img_link) {
       await this.coursesService.create(createCourseDto, img_link);
    }
  }

  @Get('/list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User Token',
    required: false,
  })
  async findOne(
    @Param('id') id: string,
    @Headers() header: any,
  ) {
    const user_id = tokenUtils(header);

    return await this.coursesService.findOne(id, user_id);
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
    if (file) {
      const img_link: any = googleCloud(file) as any;
      if (img_link) {
        await this.coursesService.update(id, dto, img_link);
      }
    } else {
      await this.coursesService.update(id, dto, undefined);
    }
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
