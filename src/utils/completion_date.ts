const oy_qaytishi = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export const completionDate = (time: Date): string => {
  const date = JSON.stringify(time)
    .split('T')[0]
    .split('"')[1]
    .split('-')
    .reverse()
    .map((e) => Number(e));
  let count = 0;
  for (let j = 0; j < 6; j++) {
    if (j == 0) {
      count += oy_qaytishi[date[1]] - date[0];
    } else {
      if (date[1] + j > 12) {
        const oy = 1;
        count += oy_qaytishi[oy + j];
      } else {
        count += oy_qaytishi[date[1] + j];
      }
    }
  }
  for (let i = 0; i < count; i++) {
    date[0]++;
    if (date[1] >= 12 && oy_qaytishi[date[1]] < date[0]) {
      date[2]++;
      date[1] = 1;
      date[0] = 1;
    }
    if (oy_qaytishi[date[1]] < date[0]) {
      date[0] = 1;
      date[1]++;
    }
  }
  return date
    .map((e: number) => (`${e}`.length === 1 ? `0${e}` : String(e)))
    .join(' ');
};
