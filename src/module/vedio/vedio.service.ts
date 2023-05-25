import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVedioDto } from './dto/create-vedio.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';
import { VideoEntity } from 'src/entities/video.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { TopikEntity } from 'src/entities/topik.entity';

@Injectable()
export class VedioService {
  async create(createVedioDto: CreateVedioDto, link: any) {
    const course = await CourseEntity.findOneBy({
      id: createVedioDto.course_id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });

    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    // const topik = await TopikEntity.findOneBy({
    //   id: createVedioDto.topik_id,
    // }).catch(() => {
    //   throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    // });

    // if (!topik) {
    //   throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    // }

    if (!Number(createVedioDto.sequence)) {
      throw new HttpException('Sequence a number', HttpStatus.NOT_FOUND);
    }

    const findVedio = await VideoEntity.find();

    if (findVedio.find((e) => e.sequence == Number(createVedioDto.sequence))) {
      throw new HttpException(
        'There is a video of this sequence',
        HttpStatus.CONFLICT,
      );
    }

    return await VideoEntity.createQueryBuilder()
      .insert()
      .into(VideoEntity)
      .values({
        link: link,
        title: createVedioDto.title,
        sequence: Number(createVedioDto.sequence),
        description: createVedioDto.description,
        duration: createVedioDto.duration,
        course: course,
      })
      .returning('*')
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(header: any) {
    // const findCourse = await CourseEntity.find().catch(() => {
    //   throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    // });
    // console.log(findCourse);

    return await VideoEntity.find({
      relations: {
        workbook: true,
        open_book: true,
      },
      order: {
        sequence: 'ASC',
      },
    }).catch(() => {
      throw new HttpException('Vedio Not Found', HttpStatus.NOT_FOUND);
    });
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
