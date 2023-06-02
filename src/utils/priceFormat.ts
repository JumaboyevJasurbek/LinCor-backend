export const formatPrice = (price: any) => {
  let arr1 = price
    .split('')
    .filter((e) => e != ' ' && e != '.' && e != ',')
    .reverse()
    .filter((e) => !isNaN(e) && e.length);
  return [...Array(Math.ceil(arr1.length / 3))]
    .map(() => arr1.splice(0, 3).reverse().join(''))
    .filter((e) => e.length)
    .reverse()
    .join('.');
};
