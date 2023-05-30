import { utilsDate } from 'src/utils/date';
import { completionDate } from '../../../utils/completion_date';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';
import { TakenWorkbook } from 'src/entities/take_workbook';

export const oneFor = async (user: any) => {
  const byCourse: any = [...user.open_course];
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

  for (let i = 0; i < byCourse.length; i++) {
    byCourse[i].purchaseDate = utilsDate(user.open_course[i].create_data);
    byCourse[i].completionDate = completionDate(
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
      byCourse[i].lesson_learned = 0;
      for (let k = 0; k < result.length; k++) {
        if (result[k] == byCourse[i].course_id?.id) {
          byCourse[i].lesson_learned += 1;
        }
      }
      byCourse[i].total_lessons =
        user.open_course[i].course_id.course_videos.length;
      byCourse[i].remaining_lessons =
        user.open_course[i].course_id.course_videos.length -
        byCourse[i].lesson_learned;

      byCourse[i].id = user.open_course[i].course_id.id;
      byCourse[i].title = user.open_course[i].course_id.title;
      byCourse[i].description = user.open_course[i].course_id.description;
      byCourse[i].price = user.open_course[i].course_id.price;
      byCourse[i].image = user.open_course[i].course_id.image;
      byCourse[i].sequence = user.open_course[i].course_id.sequence;
      if (byCourse[i].course_id.discount?.length) {
        byCourse[i].chegirma = byCourse[i].course_id.discount[0]?.taken[0].win
          ? byCourse[i].course_id.discount[0].percentage
          : false;
      } else {
        byCourse[i].chegirma = false;
      }
      if (sertifikat.length) {
        const bySertifikat = sertifikat.find(
          (e) =>
            e.user_id?.id == user.id &&
            e.course.id == byCourse[i].course_id?.id,
        );
        byCourse[i].sertifikat = bySertifikat
          ? utilsDate(bySertifikat?.create_data)
          : true;
      } else {
        byCourse[i].sertifikat = true;
      }
      byCourse[i].category = 'course';
      delete byCourse[i].topik_id;
      delete byCourse[i].course_id;
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
      byCourse[i].lesson_learned = 0;
      for (let k = 0; k < result.length; k++) {
        if (result[k] == byCourse[i].topik_id?.id) {
          byCourse[i].lesson_learned += 1;
        }
      }
      byCourse[i].total_lessons =
        user.open_course[i].topik_id.topik_videos.length;
      byCourse[i].remaining_lessons =
        user.open_course[i].topik_id.topik_videos.length -
        byCourse[i].lesson_learned;

      byCourse[i].id = user.open_course[i].topik_id.id;
      byCourse[i].title = user.open_course[i].topik_id.title;
      byCourse[i].description = user.open_course[i].topik_id.description;
      byCourse[i].price = user.open_course[i].topik_id.price;
      byCourse[i].image = user.open_course[i].topik_id.image;
      byCourse[i].sequence = user.open_course[i].topik_id.sequence;
      byCourse[i].category = 'topik';
      delete byCourse[i].course_id;
      delete byCourse[i].topik_id;
    }
    delete user.open_course[i].create_data;
  }

  delete user.parol;
  delete user.open_course;
  delete user.auth_socials;
  delete user.take_discount;
  return byCourse;
};
