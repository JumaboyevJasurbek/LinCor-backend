import { TokenUserMiddleWare } from './../../middleware/token.user.middleware';
import { TokenAdminMiddleWare } from './../../middleware/token.admin.middleware';
import { CreateVedioDto } from './dto/create-vedio.dto';
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
  Headers,
  Patch,
  Delete,
  UploadedFile,
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

@Controller('vedio')
@ApiTags('Video')
export class VedioController {
  constructor(
    private readonly vedioService: VedioService,
    private readonly userToken: TokenUserMiddleWare,
    private readonly adminToken: TokenAdminMiddleWare,
  ) {}

  @Post('/create')
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
  create(
    @Body() createVedioDto: CreateVedioDto,
    @UploadedFile() link: Express.Multer.File,
  ) {
    const vedio: string = googleCloud(link);
    if (vedio) {
      return this.vedioService.create(createVedioDto, vedio);
    }
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'optional',
    required: false,
  })
  findAll(@Headers() header: any) {
    if (header.autharization) {
      return this.vedioService.findAll(header);
    }
  }

  @Get(':id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'optional',
    required: false,
  })
  findOne(@Param('id') id: string) {
    return this.vedioService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
          default: 'uuid',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateVedioDto: UpdateVedioDto) {
    return this.vedioService.update(+id, updateVedioDto);
  }

  @Delete(':id')
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
    return this.vedioService.remove(+id);
  }
}