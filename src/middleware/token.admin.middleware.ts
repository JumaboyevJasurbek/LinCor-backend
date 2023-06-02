import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'src/utils/jwt';

@Injectable()
export class TokenAdminMiddleWare implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const { headers }: any = req;

    if (!headers.autharization) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const admin = jwt.verify(headers.autharization);
    console.log(admin);

    if (!admin) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }

    if (!admin?.email && !admin?.password) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    if (
      admin?.email !== process.env.ADMIN_EMAIL &&
      admin?.password !== process.env.ADMIN_PASSWORD
    ) {
      throw new HttpException('Siz Admin emasiz', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
