export const comparison = (oneMonthLater: any[], twoMonthLater: any[]) => {
  if (
    Number(oneMonthLater[0]) <= Number(twoMonthLater[0]) &&
    Number(oneMonthLater[1]) > Number(twoMonthLater[1]) &&
    Number(oneMonthLater[2]) == Number(twoMonthLater[2])
  ) {
    return true;
  } else if (
    Number(oneMonthLater[0]) >= Number(twoMonthLater[0]) &&
    Number(oneMonthLater[1]) == Number(twoMonthLater[1]) &&
    Number(oneMonthLater[2]) == Number(twoMonthLater[2])
  ) {
    return true;
  } else {
    return false;
  }
};
