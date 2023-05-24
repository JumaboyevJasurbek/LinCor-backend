import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrDto } from './dto/registr';
import { random } from 'src/utils/random';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { UsersEntity } from 'src/entities/users.entity';
import senMail from 'src/utils/nodemailer';
import { RedisService } from '@liaoliaots/nestjs-redis';
import jwt from 'src/utils/jwt';
import { InsertResult } from 'typeorm';
import { LoginDto } from './dto/login';
import { Auth_socials } from 'src/types';
import { FirebaseRegistrDto } from './dto/firebase.registr';
import { FirebaseLoginDto } from './dto/firebase.login';
import { AdminLoginDto } from './dto/admin.login';

@Injectable()
export class UsersService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async registr(body: RegistrDto) {
    const randomSon = random();
    const findUser: any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => []);

    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await senMail(body.email, randomSon);
    const solt = await bcrypt.genSalt();

    const newObj = {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      area: body.area,
      password: await bcrypt.hash(body.password, solt),
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async registr_email(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser: any = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => []);
    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: InsertResult = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        surname: redis.lastname,
        username: redis.name,
        area: redis.area,
        email: redis.email,
        parol: redis.password,
        auth_socials: Auth_socials.NODEMAILER,
      })
      .returning('*')
      .execute()
      .catch(() => {
        throw new HttpException(
          'UNPROCESSABLE_ENTITY',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
    const token = jwt.sign({
      id: newUser?.raw[0]?.id,
      email: newUser?.raw[0]?.email,
    });

    this.redis.del(random);
    return {
      status: 200,
      token,
    };
  }

  async login(body: LoginDto) {
    const randomSon = random();
    const findUser: any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => []);
    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if (findUser.auth_socials !== Auth_socials.NODEMAILER) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const solt = await bcrypt.genSalt();
    const pass = await bcrypt.compare(body.password, findUser.parol);
    if (!pass) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      password: await bcrypt.hash(body.password, solt),
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async login_email(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser: any = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => []);
    if (!findUser) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({
      id: findUser.id,
      email: findUser.email,
    });

    this.redis.del(random);
    return {
      status: 200,
      token,
    };
  }

  async firebase_registr(body: FirebaseRegistrDto) {
    const findUser: UsersEntity | any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => []);

    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const solt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, solt);

    const newUser: InsertResult = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        username: body.name,
        email: body.email,
        parol: password,
        auth_socials: body.auth_socials,
      })
      .returning('*')
      .execute()
      .catch(() => {
        throw new HttpException(
          'UNPROCESSABLE_ENTITY',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });

    const token = jwt.sign({
      id: newUser?.raw[0]?.id,
      email: newUser?.raw[0]?.email,
    });

    return {
      status: 200,
      token,
    };
  }

  async firebase_login(body: FirebaseLoginDto) {
    const findUser: any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => []);
    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if (findUser.auth_socials !== body.auth_socials) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const pass = await bcrypt.compare(body.password, findUser.parol);
    if (!pass) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign({
      id: findUser.id,
      email: findUser.email,
    });

    return {
      status: 200,
      token,
    };
  }

  async admin_login(body: AdminLoginDto) {
    const randomSon = random();
    if (
      body.email !== 'ahmadjonovakmal079@gmail.com' ||
      body.password !== '12345678'
    ) {
      throw new HttpException('Siz Admin emassiz', HttpStatus.NOT_FOUND);
    }

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      password: body.password,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async admin_login_email(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (
      redis.email !== 'ahmadjonovakmal079@gmail.com' ||
      redis.password !== '12345678'
    ) {
      throw new HttpException('Siz Admin emassiz', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign({
      email: redis.email,
      password: redis.password,
    });

    this.redis.del(random);
    return {
      token,
      status: 200,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
