import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { takeUtils } from 'src/utils/take.utils';

@Injectable()
export class CoursesService {
  async oneFoundCourse(id: string): Promise<CourseEntity> {
    const course = await CourseEntity.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException('Bad Request in catch', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async create(dto: CreateCourseDto, file: string): Promise<void> {
    const courses = await CourseEntity.find();
    if ((courses.length >= 3 && Number(dto.sequence) === 0) || '') {
      throw new HttpException(
        'Courses count is must not more than 3',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    if (dto.sequence > 3) {
      throw new HttpException(
        'Course sequence must be 1 or 2 or 3 You cannot create another',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const sequency = dto.sequence;
    const foundSequency = courses.find((e) => e.sequence === Number(sequency));

    if (foundSequency) {
      throw new HttpException(
        'Courses` sequency is already has',
        HttpStatus.CONFLICT,
      );
    }
    await CourseEntity.createQueryBuilder()
      .insert()
      .into(CourseEntity)
      .values({
        title: dto.title,
        description: dto.description,
        price: dto.price,
        image: file,
        sequence: dto.sequence,
      })
      .execute();
  }

  async findAll(): Promise<CourseEntity[]> {
    return await CourseEntity.find({
      order: { sequence: 'ASC' },
    }).catch(() => {
      throw new HttpException('Courses Not Found', HttpStatus.NOT_FOUND);
    });
  }

  async findOne(id: string, user_id: any): Promise<CourseEntity> {
    const course: any = await CourseEntity.findOne({
      where: { id },
      relations: {
        course_videos: {
          open_book: true,
        },
        sertifikat: true,
        discount: true,
      },
    }).catch(() => {
      throw new HttpException('Bad Request in catch', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }
    const videos = course.course_videos.sort(
      (a: CourseEntity, b: CourseEntity) => (a.sequence > b.sequence ? 1 : -1),
    );
    const courseTaken = await takeUtils(id, user_id);

    if (courseTaken.message && courseTaken.status === 200) {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].sequence > 2) {
          console.log(videos[i].sequence > 2);

          videos[i].link = '';
          course.active = true;
        }
      }
      return course;
    } else {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].sequence > 2) {
          videos[i].link = '';
          course.active = false;
        }
      }
      return course;
    }
  }

  async update(id: string, dto: UpdateCourseDto, img_link: any): Promise<void> {
    const course = await this.oneFoundCourse(id);
    if (course.sequence !== Number(dto.sequence) && dto.sequence > 3) {
      throw new HttpException(
        'You cannot change this course sequence',
        HttpStatus.CONFLICT,
      );
    }

    if (dto.sequence > 3) {
      throw new HttpException(
        'Sequnce must be 1 or 2 or 3',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await CourseEntity.createQueryBuilder()
      .update(CourseEntity)
      .set({
        title: dto.title || course.title,
        description: dto.description || course.description,
        price: dto.price || course.price,
        sequence: dto.sequence || course.sequence,
        image: img_link ? img_link : course.image,
      })
      .where({ id })
      .execute()
      .catch((e) => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string): Promise<void> {
    await this.oneFoundCourse(id);
    await CourseEntity.delete(id).catch((e) => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }
}
