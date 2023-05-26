import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVedioDto } from './dto/create-vedio.dto';
import { CreateTopikDto } from './dto/create-topik.dto';
import { UpdateVedioDto } from './dto/update-vedio.dto';
import { VideoEntity } from 'src/entities/video.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { TopikEntity } from 'src/entities/topik.entity';
import { takeUtils } from 'src/utils/take.utils';

@Injectable()
export class VedioService {
  async createCourseVedio(createVedioDto: CreateVedioDto, link: any) {
    const course: CourseEntity = await CourseEntity.findOneBy({
      id: createVedioDto.course_id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });

    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

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
        course: createVedioDto.course_id as any,
      })
      .returning('*')
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async createTopikVedio(body: CreateTopikDto, link: any) {
    const topik: TopikEntity[] = await TopikEntity.find({
      where: {
        id: body.topik_id,
      },
    }).catch(() => {
      throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    });
    console.log(topik);

    if (!topik) {
      throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    }

    if (!Number(body.sequence)) {
      throw new HttpException('Sequence a number', HttpStatus.NOT_FOUND);
    }

    const findVedio: VideoEntity[] = await VideoEntity.find();

    if (findVedio.find((e) => e.sequence == Number(body.sequence))) {
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
        title: body.title,
        sequence: Number(body.sequence),
        description: body.description,
        duration: body.duration,
        topik: body.topik_id as any,
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

  async findOne(id: string, user_id: any): Promise<VideoEntity> {
    const findVedio: VideoEntity = await VideoEntity.findOne({
      relations: {
        course: true,
        topik: true,
        workbook: true,
      },
      where: {
        id: id,
      },
    });
    if (!findVedio) {
      throw new HttpException('Vedio Not Found', HttpStatus.NOT_FOUND);
    }
    const byTake = await takeUtils(
      findVedio.course ? findVedio.course?.id : findVedio.topik?.id,
      user_id,
    );
    if (byTake.status === 200) {
      return findVedio;
    } else {
      throw new HttpException(
        'Siz hali courseni sotib olmagansiz',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateVedioDto: UpdateVedioDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
