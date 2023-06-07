import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTakeDto } from './dto/create-take.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeEntity } from 'src/entities/take.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { CourseEntity } from 'src/entities/course.entity';
import { takeUtils } from 'src/utils/take.utils';
import { TopikEntity } from 'src/entities/topik.entity';
import { UpdateTakeDto } from './dto/update-take.dto';
import { Discount } from 'src/entities/discount.entity';

@Injectable()
export class TakeServise {
  constructor(
    @InjectRepository(TakeEntity)
    private readonly take: Repository<TakeEntity>,
  ) {}

  async create(createTakeDto: CreateTakeDto) {
    const alreadyBuy = await takeUtils(
      createTakeDto.courseId,
      createTakeDto.userId,
    );
    if (alreadyBuy.status == 200) {
      return alreadyBuy;
    }
    const findUser: UsersEntity = await UsersEntity.findOne({
      where: {
        id: createTakeDto.userId,
      },
    }).catch((e) => {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    });

    if (!findUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const findCourse = await CourseEntity.findOne({
      where: {
        id: createTakeDto.courseId,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findCourse) {
      const findTopik = await TopikEntity.findOne({
        where: {
          id: createTakeDto.courseId,
        },
      }).catch((e) => {
        throw new HttpException(
          'Course or topic not found',
          HttpStatus.NOT_FOUND,
        );
      });
      if (!findTopik) {
        return new HttpException(
          'Course or topic not found',
          HttpStatus.NOT_FOUND,
        );
      }

      await TakeEntity.createQueryBuilder()
        .insert()
        .into(TakeEntity)
        .values({
          user_id: findUser,
          topik_id: findTopik,
        })
        .execute()
        .catch((e) => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });
    } else {
      await TakeEntity.createQueryBuilder()
        .insert()
        .into(TakeEntity)
        .values({
          user_id: findUser,
          course_id: findCourse,
        })
        .execute()
        .catch((e) => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });
    }
  }

  async findAll() {
    let arr = [];
    const allTake = await TakeEntity.find({
      relations: {
        user_id: true,
        course_id: true,
        topik_id: true,
      },
    }).catch((e) => {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    });

    await Promise.all(
      allTake.map(async (e: any) => {
        if (e.course_id) {
          const findDiscount = await Discount.findOne({
            relations: {
              take_user: {
                user: true,
              },
            },
            where: {
              course_id: {
                id: e.course_id.id,
              },
            },
          });

          if (!findDiscount) {
            arr.push(e);
          } else {
            await findDiscount.take_user.map(async (n: any) => {
              if (n.user.id == e.user_id.id && n.win) {
                e.discount = true;
                e.percentage = findDiscount.percentage;
                e.discountPrise =
                  e.course_id.price -
                  (e.course_id.price * findDiscount.percentage) / 100;
                arr.push(e);
              } else {
                arr.push(e);
              }
            });
          }
        } else {
          arr.push(e);
        }
      }),
    );

    return arr;
  }

  async delete(id: string) {
    const findtake = await TakeEntity.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad Reqauast', HttpStatus.BAD_REQUEST);
    });

    if (!findtake) {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await TakeEntity.createQueryBuilder()
      .delete()
      .from(TakeEntity)
      .where({ id: findtake.id })
      .execute();
  }
}
