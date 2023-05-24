import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { TakeEntity } from 'src/entities/take.entity';

@Injectable()
export class CoursesService {
  async oneFoundCourse(id: string): Promise<CourseEntity> {
    const course = await CourseEntity.findOne({
      where: { id },
      relations: { course_videos: true, open_user: true },
    }).catch(() => {
      throw new HttpException('Bad Request in catch', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    const activeUser = await TakeEntity.findOne({
      where: { user_id: id as any },
    });

    return course;
  }

  async create(dto: CreateCourseDto, file: string): Promise<void> {
    const courses = await CourseEntity.find();
    if (courses.length >= 3) {
      throw new HttpException(
        'Courses count is must not more than 3',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const sequency = await CourseEntity.findOne({
      where: {sequence: dto.sequency}
    })
    console.log(sequency);

    if (sequency) {
      throw new HttpException(
        'Courses` sequency is already has',
        HttpStatus.NOT_ACCEPTABLE,
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
        sequence: dto.sequency,
      })
      .execute();
  }

  async findAll(): Promise<CourseEntity[]> {
    return await CourseEntity.find().catch(() => {
      throw new HttpException('Courses Not Found', HttpStatus.NOT_FOUND);
    });
  }

  async findOne(id: string, user_id: any): Promise<CourseEntity> {
    return await this.oneFoundCourse(id);
  }

  async update(id: string, dto: UpdateCourseDto): Promise<void> {
    // return `This action updates a #${id} course`;
  }

  async remove(id: string): Promise<void> {
    // return `This action removes a #${id} course`;
  }
}
