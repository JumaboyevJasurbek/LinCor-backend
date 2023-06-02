import { utilsDate } from 'src/utils/date';
import { completionDate } from '../../../utils/completion_date';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';
import { TakenWorkbook } from 'src/entities/take_workbook';

export const oneFor = async (user: any) => {
  const byCourses: any = [...user.open_course];
  const sertifikat = await TakenSertifikat.find({
    relations: {
      user_id: true,
      course: true,
    },
  }).catch(() => []);

  const takeWorkbook: any = await TakenWorkbook.find({
    relations: {
      user_id: true,
      workbook: {
        video_id: {
          course: true,
          topik: true,
        },
      },
    },
  }).catch(() => []);

  const result = [];

  for (let i = 0; i < byCourses.length; i++) {
    byCourses[i].purchaseDate = utilsDate(user.open_course[i].create_data);
    byCourses[i].completionDate = completionDate(
      user.open_course[i].create_data,
      6,
    );
    if (user.open_course[i].course_id) {
      for (let j = 0; j < takeWorkbook.length; j++) {
        if (takeWorkbook[j].user_id?.id == user.id) {
          result.push(
            takeWorkbook[j].workbook?.video_id?.course?.id
              ? takeWorkbook[j].workbook?.video_id?.course?.id
              : false,
          );
        }
      }
      byCourses[i].lesson_learned = 0;
      for (let k = 0; k < result.length; k++) {
        if (result[k] == byCourses[i].course_id?.id) {
          byCourses[i].lesson_learned += 1;
        }
      }
      byCourses[i].total_lessons =
        user.open_course[i].course_id.course_videos.length;
      byCourses[i].remaining_lessons =
        user.open_course[i].course_id.course_videos.length -
        byCourses[i].lesson_learned;

      byCourses[i].id = user.open_course[i].course_id.id;
      byCourses[i].title = user.open_course[i].course_id.title;
      byCourses[i].description = user.open_course[i].course_id.description;
      byCourses[i].price = user.open_course[i].course_id.price;
      byCourses[i].image = user.open_course[i].course_id.image;
      byCourses[i].sequence = user.open_course[i].course_id.sequence;
      if (byCourses[i].course_id.discount?.length) {
        byCourses[i].discount = byCourses[i].course_id.discount[0]?.taken[0].win
          ? byCourses[i].course_id.discount[0].percentage
          : false;
      } else {
        byCourses[i].discount = false;
      }
      if (sertifikat.length) {
        const bySertifikat = sertifikat.find(
          (e) =>
            e.user_id?.id == user.id &&
            e.course.id == byCourses[i].course_id?.id,
        );
        byCourses[i].sertifikat = bySertifikat
          ? utilsDate(bySertifikat?.create_data)
          : true;
      } else {
        byCourses[i].sertifikat = true;
      }
      byCourses[i].category = 'course';
      delete byCourses[i].topik_id;
      delete byCourses[i].course_id;
    } else {
      for (let j = 0; j < takeWorkbook.length; j++) {
        if (takeWorkbook[j].user_id?.id == user.id) {
          result.push(
            takeWorkbook[j].workbook?.video_id?.topik?.id
              ? takeWorkbook[j].workbook?.video_id?.topik?.id
              : false,
          );
        }
      }
      byCourses[i].lesson_learned = 0;
      for (let k = 0; k < result.length; k++) {
        if (result[k] == byCourses[i].topik_id?.id) {
          byCourses[i].lesson_learned += 1;
        }
      }
      byCourses[i].total_lessons =
        user.open_course[i].topik_id.topik_videos.length;
      byCourses[i].remaining_lessons =
        user.open_course[i].topik_id.topik_videos.length -
        byCourses[i].lesson_learned;

      byCourses[i].id = user.open_course[i].topik_id.id;
      byCourses[i].title = user.open_course[i].topik_id.title;
      byCourses[i].description = user.open_course[i].topik_id.description;
      byCourses[i].price = user.open_course[i].topik_id.price;
      byCourses[i].image = user.open_course[i].topik_id.image;
      byCourses[i].sequence = user.open_course[i].topik_id.sequence;
      byCourses[i].category = 'topik';
      delete byCourses[i].course_id;
      delete byCourses[i].topik_id;
    }
    delete user.open_course[i].create_data;
  }

  delete user.parol;
  delete user.open_course;
  delete user.auth_socials;
  delete user.take_discount;
  return byCourses;
};
