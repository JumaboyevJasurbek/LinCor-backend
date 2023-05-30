import { Injectable } from '@nestjs/common';
import { CreateUsersDiscountDto } from './dto/create-users_discount.dto';
import { UpdateUsersDiscountDto } from './dto/update-users_discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TakenDiscount } from 'src/entities/taken_discount';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDiscountService {
  constructor(
    @InjectRepository(TakenDiscount)
    private readonly user_discount: Repository<TakenDiscount>,
  ) {}
  create(createUsersDiscountDto: any) {
    return this.user_discount.save(createUsersDiscountDto);
  }

  findAll() {
    return this.user_discount.find();
  }

  findOne(id: string) {
    return this.user_discount.findAndCountBy({ id });
  }

  update(id: string, updateUsersDiscountDto: any) {
    return this.user_discount.update(id, updateUsersDiscountDto);
  }

  remove(id: string) {
    return this.user_discount.delete(id);
  }
}
