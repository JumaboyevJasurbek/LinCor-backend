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

  async create(createTestDto: CreateTestDto): Promise<CreateTestDto> {
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

    return this.test.save(createTestDto);
  }

  findAdmin(user: any) {
    return this.test.findOneBy({
      discount: user,
    });
  }

  findUser(user: any) {
    return this.test.findOneBy({
      discount: user,
    });
  }

  findOne(id: string) {
    return this.test.findAndCountBy({ id });
  }

  update(id: string, updateTestDto: any) {
    return this.test.update(id, updateTestDto);
  }

  remove(id: string) {
    return this.test.delete(id);
  }
}
