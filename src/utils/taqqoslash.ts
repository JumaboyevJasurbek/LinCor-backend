export const taqqoslash = (birinchi_sana: any[], ikkinchi_sana: any[]) => {
  birinchi_sana[1] =
    String(Number(birinchi_sana[1]) + 1).length === 1
      ? `0${String(Number(birinchi_sana[1]) + 1)}`
      : String(Number(birinchi_sana[1]) + 1);
  if (
    Number(birinchi_sana[1]) >= Number(ikkinchi_sana[1]) &&
    Number(birinchi_sana[2]) == Number(ikkinchi_sana[2])
  ) {
    return true;
  } else {
    return false;
  }
};
