import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';
import { SertificateService } from './sertificate.service';
import { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Sertificate')
@Controller('sertificate')
export class SertificateController {
  constructor(private readonly sertificateService: SertificateService) {}

  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @Get('/get/:course')
  async get(
    @Res() res: Response,
    @Param('course', ParseUUIDPipe) course: string,
    @Req() req: Request,
  ) {
    await this.sertificateService.getSertificate(course, req.user_id, res);
  }
}
