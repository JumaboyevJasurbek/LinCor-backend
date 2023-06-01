import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Repository, Unique } from 'typeorm';
import { TestsEntity } from 'src/entities/tests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';

@Injectable()
export class TestsService {
  constructor() {}

  async create(createTestDto: CreateTestDto) {
    const findDiscount: any = await Discount.findOne({
      where: { id: createTestDto.discount },
      relations: {
        test: true,
      },
    }).catch(() => []);

    if (!findDiscount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }

    const unique = findDiscount?.test?.find(
      (e) => e.sequence == createTestDto.sequence,
    );

    if (unique) {
      throw new HttpException('Returned sequence', HttpStatus.NOT_FOUND);
    }

    await TestsEntity.save(createTestDto);
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    const findId = TestsEntity.findOne({
      where: { id: id },
    });

    if (findId) {
      await TestsEntity.update(id, updateTestDto);
    } else {
      throw new HttpException('Tests id not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    const findId = TestsEntity.findOne({
      where: { id: id },
    });

    if (findId) {
      await TestsEntity.delete(id);
    } else {
      throw new HttpException('Tests id not found', HttpStatus.NOT_FOUND);
    }
  }
}
