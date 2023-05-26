import { HttpException, HttpStatus } from '@nestjs/common';
import jwt from './jwt';
import { UsersEntity } from 'src/entities/users.entity';

export const tokenUtils = async (headers: any) => {
  if (!headers?.autharization) {
    return false;
  }
  const idAndEmail = jwt.verify(headers.autharization);

  if (!idAndEmail || !idAndEmail?.id) {
    throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
  }
  const user = await UsersEntity.findOneBy({
    id: idAndEmail?.id,
    email: idAndEmail?.email,
  });

  if (!user?.email) {
    throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
  }
  return user.id;
};
