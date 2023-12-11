import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDiscountDto } from './dto/create-user-discount.dto';
import { Discount } from 'src/entities/discount.entity';
import { TakenDiscount } from 'src/entities/taken_discount';

@Injectable()
export class UserDiscountService {
  async create(body: CreateUserDiscountDto, id: string, user_id: string) {
    const discount = await Discount.findOneOrFail({
      where: { id },
      relations: {
        test: true,
      },
    });

    const takeDiscount = await TakenDiscount.findOne({
      where: {
        discount: id as any,
        user: user_id as any,
      },
    });
    console.log(takeDiscount);
    console.log(discount);
    if (takeDiscount) {
      throw new HttpException(
        'User has already run this test',
        HttpStatus.CONFLICT,
      );
    }
    let count = 0;
    const result = [];
    for (let i = 0; i < discount?.test.length; i++) {
      const findTest = body.tests.find(
        (e) =>
          e.id == discount.test[i]?.id &&
          e.sequence == discount.test[i]?.sequence,
      );
      if (findTest?.selectedAnswer === discount.test[i].answer) {
        count++;
        result.push({ sequence: findTest.sequence, result: true });
      } else {
        result.push({ sequence: findTest.sequence, result: false });
      }
    }
    if (count <= 8) {
      await TakenDiscount.createQueryBuilder()
        .insert()
        .into(TakenDiscount)
        .values({
          discount,
          user: user_id as any,
          win: true,
        })
        .execute();
    } else {
      await TakenDiscount.createQueryBuilder()
        .insert()
        .into(TakenDiscount)
        .values({
          discount,
          user: user_id as any,
          win: false,
        })
        .execute();
    }
    return {
      percend: `${count}%`,
      win: count <= 8 ? true : false,
      result,
    };
  }
}
