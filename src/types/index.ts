export interface ReturnType {
  message: string;
  status: number;
}

declare global {
  namespace Express {
    interface Request {
      user_id: string;
    }
  }
}

export enum UserArea {
  Toshkent = 'Toshkent',
  Andijon = 'Andijon',
  Buxoro = 'Buxoro',
  Fargona = "Farg'ona",
  Jizzax = 'Jizzax',
  Xorazm = 'Xorazm',
  Namangan = 'Namangan',
  Navoiy = 'Navoiy',
  Qashqadaryo = 'Qashqadaryo',
  Samarqand = 'Samarqand',
  Surxondaryo = 'Surxondaryo',
  Qoraqalpogiston = "Qoraqalpog'iston",
}

export enum Answer {
  A = 'a',
  B = 'b',
  C = 'c',
}
