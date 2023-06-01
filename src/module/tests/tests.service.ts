import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Repository, Unique } from 'typeorm';
import { TestsEntity } from 'src/entities/tests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly test: Repository<TestsEntity>,
  ) {}

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

    await this.test.save(createTestDto);
  }

  async findAdmin(user: any) {
    return await this.test.findOneBy({
      discount: user,
    });
  }

  async findUser(user: any) {
    return await this.test.findOneBy({
      discount: user,
    });
  }

  async findOne(id: string) {
    return await this.test.findAndCountBy({ id });
  }

  async update(id: string, updateTestDto: any) {
    await this.test.update(id, updateTestDto);
  }

  async remove(id: string) {
    await this.test.delete(id);
  }
}
