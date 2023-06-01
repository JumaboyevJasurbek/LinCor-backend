export const utilsDate = (startDate: Date): string => {
  const date = JSON.stringify(startDate)
    .split('T')[0]
    .split('"')[1]
    .split('-')
    .reverse()
    .join(' ');

  return date;
};
