import { CourseEntity } from 'src/entities/course.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { TopikEntity } from 'src/entities/topik.entity';
import { UsersEntity } from 'src/entities/users.entity';

export const takeUtils = async (courseID: string, userID: string) => {
  const course: CourseEntity = await CourseEntity.findOne({
    where: {
      id: courseID,
    },
  }).catch(() => undefined);

  const user: UsersEntity = await UsersEntity.findOne({
    where: {
      id: userID,
    },
  }).catch(() => undefined);

  if (!course) {
    const topik: TopikEntity = await TopikEntity.findOne({
      where: {
        id: courseID, 
      },
    }).catch(() => undefined);
    if (!topik) {
      return {
        message: 'Bunday Course va Topik topilmadi',
        status: 404,
      };
    }

    const take: TakeEntity = await TakeEntity.findOne({
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
        status: 200,
        data: take,
      };
    } else {
      return {
        message: 'Sotib olmagan',
        status: 400,
      };
    }
  } else {
    const take: any = await TakeEntity.findOne({
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
        status: 200,
        data: take,
      };
    } else {
      return {
        message: 'Sotib olmagan',
        status: 400,
      };
    }
  }
};

// 200, 400, 404 status
