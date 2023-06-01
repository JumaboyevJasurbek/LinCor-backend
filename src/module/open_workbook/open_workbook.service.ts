import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateOpenWorkbookDto } from './dto/create.open_workbook.dto';
import { VideoEntity } from 'src/entities/video.entity';
import { WorkbookOpen } from 'src/entities/open_book';
import { extname } from 'path';

@Injectable()
export class OpenWorkbookService {
  constructor(private readonly httpService: HttpService) {}

  async getOpenWorkbook(res, id: string) {
    if (!id) {
      throw new HttpException('id is not come ', HttpStatus.BAD_REQUEST);
    }
    const workbook = await WorkbookOpen.findOneBy({ id });
    if (workbook.pdf) {
      const url = `https://storage.googleapis.com/producti0n/${workbook.pdf}`;
      const response = await this.httpService
        .get(url, {
          responseType: 'arraybuffer',
        })
        .toPromise();

      const data = Buffer.from(response.data, 'binary');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', data.length);
      res.setHeader('Content-Disposition', 'attachment; filename=name.pdf');
      res.end(data);
    }
  }

  async newOpenWorkbook(
    body: CreateOpenWorkbookDto,
    pdf: string,
  ): Promise<void> {
    const vidio_id: any = body.vidio_id;

    if ('.pdf' !== extname(pdf)) {
      throw new HttpException(
        'file must be PDF format',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!vidio_id) {
      throw new HttpException('no vidio id', HttpStatus.NOT_FOUND);
    }
    const foundVidio = await VideoEntity.findOneBy({
      id: vidio_id,
    });
    if (!foundVidio) {
      throw new HttpException('Vidio not found', HttpStatus.NOT_FOUND);
    }
    await WorkbookOpen.createQueryBuilder()
      .insert()
      .into(WorkbookOpen)
      .values({
        pdf,
        video_id: vidio_id,
      })
      .returning('*')
      .execute()
      .catch(() => {
        throw new HttpException(
          'workbook isnt created try again!',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async updateOpenWorkbook(video_id, id, pdf): Promise<void> {
    if (!video_id) {
      throw new HttpException('vidio id not came', HttpStatus.NOT_FOUND);
    }
    const foundVidio = await VideoEntity.findOneBy({
      id: video_id,
    });
    if (!foundVidio) {
      throw new HttpException('problem with Vidio!', HttpStatus.NOT_FOUND);
    }
    if (!id) {
      throw new HttpException('pdf_id not found', HttpStatus.NOT_FOUND);
    }
    const foundPDF = await WorkbookOpen.findOneBy({
      id: id,
    });
    if (!foundPDF) {
      throw new HttpException('pdf not found', HttpStatus.NOT_FOUND);
    }

    const updatedPDF = {
      video_id: video_id ? video_id : foundPDF.video_id,
      pdf: pdf ? pdf : foundPDF.pdf,
    };

    await WorkbookOpen.createQueryBuilder()
      .update()
      .set(updatedPDF)
      .where({ id })
      .execute();
  }

  async deleteOpenWorkbook(id: string): Promise<void> {
    if (!id) {
      throw new HttpException('id is not come ', HttpStatus.NOT_FOUND);
    }
    const foundPDF = await WorkbookOpen.findOneBy({
      id: id,
    });
    if (!foundPDF) {
      throw new HttpException(
        'no pdf similar your id  for delete !',
        HttpStatus.NOT_FOUND,
      );
    }
    await WorkbookOpen.createQueryBuilder().delete().where({ id }).execute();
  }
}
