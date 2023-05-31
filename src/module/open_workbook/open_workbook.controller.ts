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
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { CreateOpenWorkbookDto } from './dto/create.open_workbook.dto';
import { OpenWorkbookService } from './open_workbook.service';
import { googleCloud } from 'src/utils/google-cloud';
import { PatchOpenWorkbookDto } from './dto/patch.open_workbook.dto';

@Controller('open_workbook')
@ApiTags('OpenWorkBook')
export class OpenWorkbookController {
  constructor(private readonly openWorkbookService: OpenWorkbookService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  async getOpenWorkbook(@Res() res: Response, @Param('id') id: string) {
    return this.openWorkbookService.getOpenWorkbook(res, id);
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['vidio_id', 'file'],
      properties: {
        vidio_id: {
          type: 'string',
          default: '61ac4985-aac7-417f-9c86-ecbc8529feb0',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  createOpenWorkbook(
    @Body() body: CreateOpenWorkbookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const pdf: string = googleCloud(file);
    if (pdf) {
      return this.openWorkbookService.newOpenWorkbook(body, pdf);
    }
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        vidio_id: {
          type: 'string',
          default: '61ac4985-aac7-417f-9c86-ecbc8529feb0',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async updateOpenWorkbook(
    @Body() { vidio_id }: PatchOpenWorkbookDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const pdf: string = googleCloud(file);
      return this.openWorkbookService.updateOpenWorkbook(
        vidio_id.trim(),
        id.trim(),
        pdf,
      );
    } else {
      return this.openWorkbookService.updateOpenWorkbook(
        vidio_id.trim(),
        id.trim(),
        false,
      );
    }
  }
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async deleteOpenWorkbook(@Param('id') id: string) {
    return this.openWorkbookService.deleteOpenWorkbook(id.trim());
  }
}
