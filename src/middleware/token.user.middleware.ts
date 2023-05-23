import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersEntity } from 'src/entities/users.entity';
import jwt from 'src/utils/jwt';

@Injectable()
export class TokenUserMiddleWare implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { headers }: any = req;

    if (!headers.autharization) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const idAndEmail = jwt.verify(headers.autharization);
    if (!idAndEmail) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const user = await UsersEntity.findOneBy({
      id: idAndEmail?.id,
      email: idAndEmail?.email,
    });

    if (!user?.email) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    req.user_id = user.id;
    next();
  }
}
