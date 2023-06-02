import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { takeUtils } from 'src/utils/take.utils';
import { tokenUtils } from 'src/utils/token.utils';
import { formatPrice } from 'src/utils/priceFormat';
import { googleCloud } from 'src/utils/google-cloud';
import { extname } from 'path';

@Injectable()
export class CoursesService {
  async oneFoundCourse(id: string): Promise<CourseEntity> {
    const course = await CourseEntity.findOne({
      where: { id },
    }).catch(() => undefined);
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async create(dto: CreateCourseDto, file: Express.Multer.File): Promise<void> {
    const img_link: string = googleCloud(file);
    const typeOfFile = extname(file.originalname);

    if (
      typeOfFile != '.png' &&
      typeOfFile != '.svg' &&
      typeOfFile != '.jpeg' &&
      typeOfFile != '.avif' &&
      typeOfFile != '.jpg'
    ) {
      throw new HttpException(
        'The type of file is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const courses = await CourseEntity.find();

    if (courses.length >= 3) {
      throw new HttpException(
        'Courses count is must not more than 3',
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
        price: formatPrice(dto.price),
        image: img_link,
        sequence: dto.sequence,
      })
      .execute();
  }

  async findAll(): Promise<CourseEntity[]> {
    return await CourseEntity.find({
      order: { sequence: 'ASC' },
    }).catch(() => []);
  }

  async findOne(id: string, header: any): Promise<CourseEntity> {
    const user_id: string | boolean = await tokenUtils(header);

    const course: any = await CourseEntity.findOne({
      where: { id },
      relations: {
        course_videos: {
          open_book: true,
        },
        sertifikat: true,
        discount: true,
      },
    }).catch(() => undefined);
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }
    const videos = course.course_videos.sort(
      (a: CourseEntity, b: CourseEntity) => a.sequence - b.sequence,
    );
    if (user_id) {
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

  async update(
    id: string,
    dto: UpdateCourseDto,
    file: Express.Multer.File,
  ): Promise<void> {
    const course = await this.oneFoundCourse(id);

    let img_link: any = false;
    if (file) {
      const typeOfFile = extname(file.originalname);
      if (
        typeOfFile != '.png' &&
        typeOfFile != '.svg' &&
        typeOfFile != '.jpg' &&
        typeOfFile != '.jpeg' &&
        typeOfFile != '.avif'
      ) {
        throw new HttpException(
          'The type of file is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
      img_link = googleCloud(file);

      if (course.sequence !== Number(dto.sequence)) {
        throw new HttpException(
          'You cannot change this course sequence',
          HttpStatus.CONFLICT,
        );
      }
    }
    await CourseEntity.createQueryBuilder()
      .update(CourseEntity)
      .set({
        title: dto.title || course.title,
        description: dto.description || course.description,
        price: formatPrice(dto.price) || course.price,
        sequence: dto.sequence || course.sequence,
        image: img_link || course.image,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string): Promise<void> {
    await this.oneFoundCourse(id);
    await CourseEntity.delete(id).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }
}
