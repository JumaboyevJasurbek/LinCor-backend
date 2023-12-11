export const random = (): string => {
  const randomNumber = Math.floor(Math.random() * 99999) + 1;
  return String(randomNumber).padStart(5, '5');
};
