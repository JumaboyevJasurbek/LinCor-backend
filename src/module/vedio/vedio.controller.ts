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

  @Post('/course')
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
  createCourseVedio(
    @Body() createVedioDto: CreateVedioDto,
    @UploadedFile() link: Express.Multer.File,
  ) {
    const vedio: string = googleCloud(link);
    if (vedio) {
      const ext = extname(vedio);
      if (ext == '.mp4') {
        return this.vedioService.createCourseVedio(createVedioDto, vedio);
      } else {
        throw new HttpException(
          'The file type is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Post('/topik')
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
  createTopikVedio(
    @Body() body: CreateTopikDto,
    @UploadedFile() link: Express.Multer.File,
  ) {
    const topikVedio: string = googleCloud(link);
    if (topikVedio) {
      const ext = extname(topikVedio);
      if (ext == '.mp4') {
        return this.vedioService.createTopikVedio(body, topikVedio);
      } else {
        throw new HttpException(
          'The file type is not correct',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Get('/admin/:course')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  find(@Param('id') id: string) {
    return this.vedioService.findCourseVedio(id);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'optional',
    required: false,
  })
  findOne(@Param('id') id: string, @Request() req: any) {
    const { user_id } = req;
    return this.vedioService.findOne(id, user_id);
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
          default: '35bf2a3c-e931-4f81-9567-9a34bbeaf7fg',
        },
        topik_id: {
          type: 'string',
          default: '35bf2a3c-e931-4f81-9567-9a34bbeaf7fg',
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
    required: false,
  })
  update(
    @Param('id') id: string,
    @Body() updateVedioDto: UpdateVedioDto,
    @UploadedFile() link: Express.Multer.File,
  ) {
    if (link) {
      const Vediolink: string = googleCloud(link);
      return this.vedioService.update(id, updateVedioDto, Vediolink);
    } else {
      return this.vedioService.update(id, updateVedioDto, false);
    }
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
  remove(@Param('id') id: string) {
    return this.vedioService.remove(id);
  }
}
