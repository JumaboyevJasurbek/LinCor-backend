import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';
import { Repository } from 'typeorm';
import { CourseEntity } from 'src/entities/course.entity';

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
      await this.discount.save(createDiscountDto);
    } else {
      throw new HttpException('Course not found', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const discount: any = await Discount.find({
      relations: {
        take_user: true,
      },
    });

    for (let i = 0; i < discount.length; i++) {
      discount[i].win = discount[i].take_user.filter((e) => e.win).length;
      discount[i].lose = discount[i].take_user.filter((e) => !e.win).length;
      delete discount[i].take_user;
    }
    return discount;
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    const findCourse: any = await CourseEntity.findOne({
      where: { id: updateDiscountDto.course_id },
    });

    if (findCourse) {
      Discount.update(id, updateDiscountDto);
    } else {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    const findCourse: any = await Discount.findOne({
      where: { id },
    });
    if (findCourse) {
      Discount.delete(id);
    } else {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  }
}
