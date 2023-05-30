export const takenCourse = (course: any) => {
  const arr = [];
  const result = [];

  for (let i = 0; i < course.length; i++) {
    if (course[i]?.category == 'course') {
      arr.push(course[i]?.sequence);
    } else {
      arr.push(3 + course[i]?.sequence);
    }
  }
  arr.sort((a, b) => a - b);
  for (let i = 1; i <= 6; i++) {
    if (arr.includes(i)) {
      if (i <= 3) {
        result.push({ sequence: i, course: true });
      } else {
        result.push({ sequence: i, topik: true });
      }
    } else {
      if (i <= 3) {
        result.push({ sequence: i, course: false });
      } else {
        result.push({ sequence: i, topik: false });
      }
    }
  }
  return result;
};
