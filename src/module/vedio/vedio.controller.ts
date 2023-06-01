import { CreateVedioDto } from './dto/create-vedio.dto';
import { CreateTopikDto } from './dto/create-topik.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';
import { googleCloud } from 'src/utils/google-cloud';
import {
  Controller,
  Post,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFile,
  Request,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VedioService } from './vedio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('vedio')
@ApiTags('Video')
export class VedioController {
  constructor(private readonly vedioService: VedioService) {}

  @Post('/course/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'link',
        'title',
        'sequence',
        'description',
        'duration',
        'course_id',
      ],
      properties: {
        link: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: '1-dars',
        },
        sequence: {
          type: 'number',
          default: 1,
        },
        description: {
          type: 'string',
          default: 'Bugungi dars anaxasio',
        },
        duration: {
          type: 'string',
          default: '10:10',
        },
        course_id: {
          type: 'string',
          default: '92b708ed-afed-484a-b7e4-15ffc5c1e288',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('link'))
  async createCourseVedio(
    @Body() createVedioDto: CreateVedioDto,
    @UploadedFile() link: Express.Multer.File,
  ): Promise<void> {
    await this.vedioService.createCourseVedio(createVedioDto, link);
  }

  @Post('/topik/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'link',
        'title',
        'sequence',
        'description',
        'duration',
        'topik_id',
      ],
      properties: {
        link: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: '1-dars',
        },
        sequence: {
          type: 'number',
          default: 1,
        },
        description: {
          type: 'string',
          default: 'Bugungi dars anaxasio',
        },
        duration: {
          type: 'string',
          default: '10:10',
        },
        topik_id: {
          type: 'string',
          default: '92b708ed-afed-484a-b7e4-15ffc5c1e288',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('link'))
  async createTopikVedio(
    @Body() body: CreateTopikDto,
    @UploadedFile() link: Express.Multer.File,
  ): Promise<void> {
    await this.vedioService.createTopikVedio(body, link);
  }

  @Get('/byCourse/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async find(@Param('id') id: string) {
    return await this.vedioService.findCourseVedio(id);
  }

  @Get('/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return await this.vedioService.findOne(id, req);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('multipart/form-data')
  @ApiNoContentResponse()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        link: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: '1-dars',
        },
        sequence: {
          type: 'number',
          default: 1,
        },
        description: {
          type: 'string',
          default: 'Bugungi dars anaxasio',
        },
        duration: {
          type: 'string',
          default: '10:00',
        },
        course_id: {
          type: 'string',
          default: '',
        },
        topik_id: {
          type: 'string',
          default: '',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('link'))
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateVedioDto: UpdateVedioDto,
    @UploadedFile() link: Express.Multer.File,
  ) {
    await this.vedioService.update(id, updateVedioDto, link);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.vedioService.remove(id);
  }
}
