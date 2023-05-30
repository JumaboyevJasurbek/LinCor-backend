import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';
import { Repository } from 'typeorm';
import { CourseEntity } from 'src/entities/course.entity';
// import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discount: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    const findCourse: any = await CourseEntity.findOne({
      where: { id: createDiscountDto.course_id },
    });

    if (findCourse) {
      return await this.discount.save(createDiscountDto);
    } else {
      throw new HttpException('Course not found', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.discount.find({
      relations: { course_id: true, taken: true, test: true },
    });
  }

  findOne(id: string) {
    return this.discount.findAndCountBy({ id });
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    const findCourse: any = await CourseEntity.findOne({
      where: { id: updateDiscountDto.course_id },
    });

    if (findCourse) {
      return this.discount.update(id, updateDiscountDto);
    } else {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    const findCourse: any = await this.discount.findOne({
      where: { id },
    });
    if (findCourse) {
      return this.discount.delete(id);
    }
  }
}
