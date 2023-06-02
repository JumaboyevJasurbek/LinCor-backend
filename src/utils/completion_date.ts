const month_return = {
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

export const completionDate = (startDate: Date, monthLimit: number): string => {
  const date = JSON.stringify(startDate)
    .split('T')[0]
    .split('"')[1]
    .split('-')
    .reverse()
    .map((e) => Number(e));

  date[1] += monthLimit;
  if (date[1] > 12) {
    date[1] -= 12;
    date[2] += 1;
  }
  if (month_return[date[1]] < date[0]) {
    date[0] -= month_return[date[1]];
    date[1] += 1;
  }
  if (date[1] > 12) {
    date[1] -= 12;
    date[2] += 1;
  }
  return date
    .map((e: number) => (`${e}`.length === 1 ? `0${e}` : String(e)))
    .join(' ');
};
