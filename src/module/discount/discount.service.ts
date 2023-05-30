import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discount: Repository<Discount>,
  ) {}
  create(createDiscountDto: any) {
    return this.discount.save(createDiscountDto);
  }

  findAll() {
    return this.discount.find();
  }

  findOne(id: string) {
    return this.discount.findAndCountBy({ id });
  }

  update(id: string, updateDiscountDto: any) {
    return this.discount.update(id, updateDiscountDto);
  }

  remove(id: string) {
    return this.discount.delete(id);
  }
}
