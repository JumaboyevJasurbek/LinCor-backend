import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Repository } from 'typeorm';
import { TestsEntity } from 'src/entities/tests.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly test: Repository<TestsEntity>,
  ) {}

  create(createTestDto: any): Promise<CreateTestDto> {
    try {
      const test = this.test.save(createTestDto);

      // if (this.test) {
      //   throw new HttpException(
      //     'this test has been added before',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      return test;
    } catch (error) {
      throw new HttpException('error in tests', HttpStatus.BAD_REQUEST);
    }
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
