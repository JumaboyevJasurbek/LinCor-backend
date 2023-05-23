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
    return this.test.find();
  }

  findOne(id: string) {
    return this.test.findAndCountBy({ id });
  }

  update(id: string, updateTestDto: UpdateTestDto) {
    return this.test.update(id, updateTestDto);
  }

  remove(id: string) {
    return this.test.delete(id);
  }
}
