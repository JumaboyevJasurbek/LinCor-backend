import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class CoursesService {
  async oneFoundCourse (id: string): Promise<CourseEntity> {
    const course = await CourseEntity.findOne({
      where: {id}
    })
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND) 
    }
    return course
  }

  async  create(dto: CreateCourseDto, file: string): Promise<void> {
    const courses = await CourseEntity.find()
    if (courses.length >= 3) {
      throw new HttpException('Courses count is must not more than 3', HttpStatus.NOT_ACCEPTABLE)
    }
    await CourseEntity.createQueryBuilder()
    .insert()
    .into(CourseEntity)
    .values({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      image: file,
      sequence: dto.sequency
    })
    .execute()
  }

  async findAll(): Promise<CourseEntity[]> {
    return await CourseEntity.find();
  }

  findOne(id: string): Promise<CourseEntity> {
    return 
  }

  async update(id: string, dto: UpdateCourseDto): Promise<void> {
    // return `This action updates a #${id} course`;
  }

  async remove(id: string): Promise<void> {
    // return `This action removes a #${id} course`;
  }
}
