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
    const course: CourseEntity = await CourseEntity.findOne({
      where: {
        id: createVedioDto.course_id,
      },
      relations: {
        course_videos: true,
      },
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });

    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    if (!Number(createVedioDto.sequence)) {
      throw new HttpException('Sequence a number', HttpStatus.NOT_FOUND);
    }

    const findCourse = course.course_videos?.find(
      (e) => e.sequence === Number(createVedioDto.sequence),
    );

    if (findCourse) {
      throw new HttpException(
        'There is a video of this sequence',
        HttpStatus.CONFLICT,
      );
    }

    await VideoEntity.createQueryBuilder()
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
    const topik: TopikEntity = await TopikEntity.findOne({
      where: {
        id: body.topik_id,
      },
      relations: {
        topik_videos: true,
      },
    }).catch(() => {
      throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    });

    if (!topik) {
      throw new HttpException('Topik Not Found', HttpStatus.NOT_FOUND);
    }

    if (!Number(body.sequence)) {
      throw new HttpException('Sequence a number', HttpStatus.NOT_FOUND);
    }

    const findTopik = topik.topik_videos?.find(
      (e) => e.sequence === Number(body.sequence),
    );

    if (findTopik) {
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
      .returning(['*'])
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async findCourseVedio(id: string) {
    const course = await CourseEntity.findOne({
      where: {
        id,
      },
      relations: {
        course_videos: true,
      },
      order: {
        course_videos: {
          sequence: 'ASC',
        },
      },
    });

    if (!course) {
      const topik = await TopikEntity.findOne({
        where: {
          id,
        },
        relations: {
          topik_videos: true,
        },
        order: {
          topik_videos: {
            sequence: 'ASC',
          },
        },
      }).catch(() => []);

      if (!topik) {
        throw new HttpException(
          'Course and Topik not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return topik;
    } else {
      return course;
    }
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
      order: {
        sequence: 'ASC',
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

  async update(id: string, updateVedioDto: UpdateVedioDto, link: any) {
    const findVedio = await VideoEntity.findOne({
      where: {
        id,
      },
      order: {
        sequence: 'ASC',
      },
    });

    if (!findVedio) {
      throw new HttpException('Vedio not found', HttpStatus.NOT_FOUND);
    }

    const findSeq: VideoEntity[] = await VideoEntity.find();

    if (findSeq.find((e) => e.sequence == Number(updateVedioDto.sequence))) {
      throw new HttpException(
        'There is a video of this sequence',
        HttpStatus.CONFLICT,
      );
    }

    await VideoEntity.createQueryBuilder()
      .update(VideoEntity)
      .set({
        link: link ? link : findVedio.link,
        title: updateVedioDto.title ? updateVedioDto.title : findVedio.title,
        sequence: updateVedioDto.sequence
          ? Number(updateVedioDto.sequence)
          : findVedio.sequence,
        description: updateVedioDto.description
          ? updateVedioDto.description
          : findVedio.description,
        duration: updateVedioDto.duration
          ? updateVedioDto.duration
          : findVedio.duration,
        topik: updateVedioDto.topik_id
          ? updateVedioDto.topik_id
          : (findVedio.topik as any),
        course: updateVedioDto.course_id
          ? updateVedioDto.course_id
          : (findVedio.course as any),
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findVedio = await VideoEntity.findOne({
      where: {
        id,
      },
    });

    if (!findVedio) {
      throw new HttpException('Vedio not found', HttpStatus.NOT_FOUND);
    }

    return await VideoEntity.createQueryBuilder()
      .delete()
      .from(VideoEntity)
      .where({ id })
      .returning(['*'])
      .execute();
  }
}
