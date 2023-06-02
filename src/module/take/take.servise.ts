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
    const allTake = await TakeEntity.find({
      relations: {
        user_id: true,
        course_id: true,
        topik_id: true,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    return allTake;
  }

  async findOne(id: string) {
    const findTake = await TakeEntity.findOne({
      relations: {
        user_id: true,
        course_id: true,
        topik_id: true,
      },
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });

    if (!findTake) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return findTake;
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
      .update(TakeEntity)
      .set({
        active: false,
      })
      .where({ id: findtake.id })
      .execute();
  }
}
