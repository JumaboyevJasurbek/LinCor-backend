import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersDiscountDto } from './dto/create-users_discount.dto';
import { UpdateUsersDiscountDto } from './dto/update-users_discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TakenDiscount } from 'src/entities/taken_discount';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Discount } from 'src/entities/discount.entity';
import { TestsEntity } from 'src/entities/tests.entity';

@Injectable()
export class UsersDiscountService {
  constructor(
    @InjectRepository(TakenDiscount)
    private readonly user_discount: Repository<TakenDiscount>,
  ) {}

  async create(
    createUsersDiscountDto: CreateUsersDiscountDto,
    // user_id: string,
  ) {
    const findDiscount: any = await Discount.findOne({
      where: { id: createUsersDiscountDto.discount },
    }).catch(() => {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    });

    if (findDiscount) {
      const findDiscountId = await Discount.find({
        // where: { discount: createUsersDiscountDto.discount },
      });

      const equalDiscount: any = findDiscountId.find(
        (e) => e.id == createUsersDiscountDto.discount,
      );

      console.log(equalDiscount);

      return this.user_discount.save(createUsersDiscountDto);
    } else {
      throw new HttpException(
        'User or discount not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return this.user_discount.find({
      relations: {
        discount: true,
      },
    });
  }

  findOne(id: string) {
    return this.user_discount.findAndCountBy({ id });
  }

  findUser(user_id: any) {
    return this.user_discount.findAndCountBy({ user: user_id });
  }

  update(id: string, updateUsersDiscountDto: any) {
    const findUser: any = UsersEntity.findOne({
      where: { id: updateUsersDiscountDto.user },
    });

    const findDiscount: any = Discount.find({
      where: { id: updateUsersDiscountDto.discount },
    });

    if (findDiscount | findUser) {
      return this.user_discount.update(id, updateUsersDiscountDto);
    } else {
      throw new HttpException(
        'User or discount not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  remove(id: string) {
    const findId: any = this.user_discount.findOne({ where: { id } });

    if (findId) {
      return this.user_discount.delete(id);
    } else {
      throw new HttpException(
        'User discount not removed',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
