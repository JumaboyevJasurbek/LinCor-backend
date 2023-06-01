import { HttpStatus } from '@nestjs/common';
import { CourseEntity } from 'src/entities/course.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { TopikEntity } from 'src/entities/topik.entity';
import { UsersEntity } from 'src/entities/users.entity';

export const takeUtils = async (courseID: string, userID: string) => {
  const course: CourseEntity | undefined = await CourseEntity.findOne({
    where: {
      id: courseID,
    },
  }).catch(() => undefined);

  const user: UsersEntity | undefined = await UsersEntity.findOne({
    where: {
      id: userID,
    },
  }).catch(() => undefined);

  if (!course) {
    const topik: TopikEntity | undefined = await TopikEntity.findOne({
      where: {
        id: courseID,
      },
    }).catch(() => undefined);
    if (!topik) {
      return {
        message: 'Bunday Course va Topik topilmadi',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const take: TakeEntity | undefined = await TakeEntity.findOne({
      relations: {
        user_id: true,
        topik_id: true,
      },
      where: {
        user_id: user as any,
        topik_id: topik as any,
      },
    }).catch(() => undefined);

    if (take) {
      return {
        message: 'Sotib olgan',
        status: HttpStatus.OK,
        data: take,
      };
    } else {
      return {
        message: 'Sotib olmagan',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  } else {
    const take: TakeEntity | undefined = await TakeEntity.findOne({
      relations: {
        user_id: true,
        course_id: true,
      },
      where: {
        user_id: user as any,
        course_id: course as any,
      },
    }).catch(() => undefined);

    if (take) {
      return {
        message: 'Sotib olgan',
        status: HttpStatus.OK,
        data: take,
      };
    } else {
      return {
        message: 'Sotib olmagan',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
};

// 200, 400, 404 status
