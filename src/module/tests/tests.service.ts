import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Repository } from 'typeorm';
import { TestsEntity } from 'src/entities/tests.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private readonly test: Repository<TestsEntity>,
  ) {}

  create(createTestDto: CreateTestDto): Promise<CreateTestDto> {
    return this.test.save(createTestDto);
  }

  findAll() {
    return `This action returns all tests`;
  }

  findOne(id: string) {
    return `This action returns a #${id} test`;
  }

  update(id: string, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: string) {
    return `This action removes a #${id} test`;
  }
}
