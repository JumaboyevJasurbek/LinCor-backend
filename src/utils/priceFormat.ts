export const formatPrice = (price: any) => {
  const arr1 = price
    .split('')
    .filter((e: any) => e != ' ' && e != '.' && e != ',')
    .reverse()
    .filter((e: any) => !isNaN(e) && e.length);
  return [...Array(Math.ceil(arr1.length / 3))]
    .map(() => arr1.splice(0, 3).reverse().join(''))
    .filter((e: any) => e.length)
    .reverse()
    .join('.');
};
