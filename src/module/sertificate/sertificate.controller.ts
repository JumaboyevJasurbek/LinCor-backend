import { Controller, Get, Param, ParseUUIDPipe, Req, Res } from '@nestjs/common';
import { SertificateService } from './sertificate.service';
import { Request, Response } from 'express';
import { ApiHeader, ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('Certificate')
@Controller('sertificate')
export class SertificateController {
  constructor(private readonly sertificateService: SertificateService) { }

  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiParam({
    name: "course",
    description: "course id",
    required: true
  })
  @Get('/get/:course')
  async get(
    @Res() res: Response,
    @Param('course', ParseUUIDPipe) course: string,
    @Req() req: Request
  ) {
    
    const userId = req.user_id

    console.log(userId);
    

    await this.sertificateService.getSertificate(
      course,
      userId,
      res
    )
  }

}