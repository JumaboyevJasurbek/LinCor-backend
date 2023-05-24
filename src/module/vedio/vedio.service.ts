import { Injectable } from '@nestjs/common';
import { CreateVedioDto } from './dto/create-vedio.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';
import { VideoEntity } from 'src/entities/video.entity';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class VedioService {
  async create(header: any, createVedioDto: CreateVedioDto) {

    const findCourse = await CourseEntity.find()
    console.log(findCourse);
    


    return await VideoEntity.find({
      relations: {
        workbook: true,
        open_book: true,
      },
    });
  }

  findAll() {
    return;
  }

  findOne(id: number) {
    return;
  }

  update(id: number, updateVedioDto: UpdateVedioDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
