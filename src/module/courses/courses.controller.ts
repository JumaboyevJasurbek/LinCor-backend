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

@Controller('courses')
@ApiTags('Courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'description', 'price', 'sequency', 'file'],
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
        sequency: {
          type: 'number',
          default: 1,
        },
        
        file: {
          type: 'string',
          format: 'binary'
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
    description: 'token',
    required: true,
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const img_link: string = googleCloud(file);
    if (img_link) {
      return this.coursesService.create(createCourseDto, img_link);
    }
  }

  @Get('/list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('/course/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  findOne(@Param('id') id: string, @Request() req: any) {
    const {user_id} = req
    return this.coursesService.findOne(id, user_id);
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
        sequency: {
          type: 'number',
          default: 1,
        },
        file: {
          type: 'string',
          format: 'binary'
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
    description: 'token',
    required: true,
  })
  async update (
    @Param('id') id: string, @Body() dto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const img_link: any = googleCloud(file)
    if (img_link) {
      return this.coursesService.update(id, dto, img_link);
    }
    return this.coursesService.update(id, dto, undefined);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiForbiddenResponse()
  remove(@Param('id') id: string,) {
    return this.coursesService.remove(id);
  }
}
