export const taqqoslash = (birinchi_sana: any[], ikkinchi_sana: any[]) => {
  if (
    Number(birinchi_sana[0]) <= Number(ikkinchi_sana[0]) &&
    Number(birinchi_sana[1]) > Number(ikkinchi_sana[1]) &&
    Number(birinchi_sana[2]) == Number(ikkinchi_sana[2])
  ) {
    return true;
  } else if (
    Number(birinchi_sana[0]) >= Number(ikkinchi_sana[0]) &&
    Number(birinchi_sana[1]) == Number(ikkinchi_sana[1]) &&
    Number(birinchi_sana[2]) == Number(ikkinchi_sana[2])
  ) {
    return true;
  } else {
    return false;
  }
};
