import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import sendMail from 'src/utils/nodemailer';
import Redis from 'ioredis';
import jwt from 'src/utils/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrDto } from './dto/registr';
import { random } from 'src/utils/random';
import { UsersEntity } from 'src/entities/users.entity';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { UpdateResult } from 'typeorm';
import { LoginDto } from './dto/login';
import { Auth_socials } from 'src/types';
import { FirebaseRegistrDto } from './dto/firebase.registr';
import { FirebaseLoginDto } from './dto/firebase.login';
import { AdminLoginDto } from './dto/admin.login';
import { PasswordDto } from './dto/password-email';
import { PasswordUpdateDto } from './dto/password-update';
import { PatchUserDto } from './dto/patch-all';
import { InPasswordDto } from './dto/inPassword';
import { oneFor } from './func/oneFor';
import { takenCourse } from './func/course';
import { TakeEntity } from 'src/entities/take.entity';
import { completionDate } from 'src/utils/completion_date';
import { utilsDate } from 'src/utils/date';
import { comparison } from 'src/module/users/func/comparison';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';
import { googleCloud } from 'src/utils/google-cloud';
dotenv.config();

@Injectable()
export class UsersService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async register(body: RegistrDto) {
    const randomSon = random();
    const findUser: any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => null);

    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await sendMail(body.email, randomSon);
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
      message: 'Code sent via email',
      status: HttpStatus.OK,
    };
  }

  async registerEmailCode(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser: any = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => null);
    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: UsersEntity = await UsersEntity.create({
      surname: redis.lastname,
      username: redis.name,
      area: redis.area,
      email: redis.email,
      parol: redis.password,
      auth_socials: Auth_socials.NODEMAILER,
    }).save();

    const token = jwt.sign({
      id: newUser?.id,
      email: newUser?.email,
    });

    this.redis.del(random);
    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async login(body: LoginDto) {
    const randomSon = random();
    const findUser: any = await UsersEntity.findOneOrFail({
      where: {
        email: body.email,
      },
    });

    if (findUser.auth_socials !== Auth_socials.NODEMAILER) {
      throw new HttpException(
        'Invalid authentication method',
        HttpStatus.BAD_REQUEST,
      );
    }

    const solt = await bcrypt.genSalt();
    const pass = await bcrypt.compare(body.password, findUser.parol);
    if (!pass) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }

    await sendMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      password: await bcrypt.hash(body.password, solt),
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code sent via email',
      status: HttpStatus.OK,
    };
  }

  async loginEmailCode(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser: any = await UsersEntity.findOneOrFail({
      where: {
        email: redis.email,
      },
    });

    const token = jwt.sign({
      id: findUser.id,
      email: findUser.email,
    });

    this.redis.del(random);
    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async firebaseRegistr(body: FirebaseRegistrDto) {
    const findUser: UsersEntity | any = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => null);

    if (findUser) {
      throw new HttpException(
        `User already exists with ${findUser?.auth_socials}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const solt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, solt);

    const newUser = await UsersEntity.create({
      username: body.name,
      email: body.email,
      parol: password,
      auth_socials: body.auth_socials,
    }).save();

    const token = jwt.sign({
      id: newUser?.id,
      email: newUser?.email,
    });

    return {
      status: HttpStatus.OK,
      token,
    };
  }

  async firebaseLogin(body: FirebaseLoginDto) {
    const findUser: any = await UsersEntity.findOneOrFail({
      where: {
        email: body.email,
      },
    });

    if (findUser.auth_socials !== body.auth_socials) {
      throw new HttpException(
        'Invalid authentication method',
        HttpStatus.BAD_REQUEST,
      );
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
      status: HttpStatus.OK,
      token,
    };
  }

  async adminEmailRequest(body: AdminLoginDto) {
    const randomSon = random();
    if (
      body.email !== process.env.ADMIN_EMAIL ||
      body.password !== process.env.ADMIN_PASSWORD
    ) {
      throw new HttpException(
        "Yaroqsiz hisob ma'lumotlari",
        HttpStatus.NOT_FOUND,
      );
    }

    await sendMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      password: body.password,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code sent via email',
      status: HttpStatus.OK,
    };
  }

  async adminCodeRequest(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (
      redis.email !== process.env.ADMIN_EMAIL ||
      redis.password !== process.env.ADMIN_PASSWORD
    ) {
      throw new HttpException(
        "Yaroqsiz hisob ma'lumotlari",
        HttpStatus.NOT_FOUND,
      );
    }

    const token = jwt.sign({
      email: redis.email,
      password: redis.password,
    });

    this.redis.del(random);
    return {
      token,
      status: HttpStatus.OK,
    };
  }

  async password(body: PasswordDto) {
    const randomSon = random();
    await UsersEntity.findOneOrFail({ where: { email: body.email } });
    await sendMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code sent via email',
      status: HttpStatus.OK,
    };
  }

  async passwordCode(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await UsersEntity.findOneOrFail({ where: { email: redis.email } });

    return {
      message: 'Correct password',
      status: HttpStatus.OK,
    };
  }

  async passwordUpdate(body: PasswordUpdateDto) {
    const random = body.code;
    const redis: any = JSON.parse(await this.redis.get(random));

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const findUser = await UsersEntity.findOneOrFail({
      where: { email: redis.email },
    });

    this.redis.del(random);
    if (body.newPassword != body.password) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const solt = await bcrypt.genSalt();
    await UsersEntity.createQueryBuilder()
      .update()
      .set({
        parol: await bcrypt.hash(body.password, solt),
      })
      .where({ id: findUser.id })
      .execute();
    return {
      message: 'User password successfully updated',
      status: HttpStatus.OK,
    };
  }

  async passwordIN(id: string, body: InPasswordDto) {
    const findUser: any = await UsersEntity.findOneOrFail({
      where: { id },
    });
    if (body.newPassword != body.password) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const solt = await bcrypt.genSalt();
    await UsersEntity.createQueryBuilder()
      .update()
      .set({
        parol: await bcrypt.hash(body.password, solt),
      })
      .where({ id: findUser.id })
      .execute();
  }

  async updateFile(file: Express.Multer.File, id: string) {
    await UsersEntity.createQueryBuilder()
      .update()
      .set({ image: googleCloud(file) })
      .where({ id })
      .execute();
  }

  async patch(id: string, body: PatchUserDto) {
    const findUser: any = await UsersEntity.findOneOrFail({
      where: { id },
    });

    if (body?.phone) {
      const phone = Number(body?.phone.split(' ').join(''));
      if (!phone || String(phone).length > 9) {
        throw new HttpException('Phone Wrong format', HttpStatus.BAD_REQUEST);
      }

      await UsersEntity.createQueryBuilder()
        .update()
        .set({
          username: body.first_name || findUser.username,
          surname: body.last_name || findUser.surname,
          area: body.area || findUser.area,
          phone: phone,
        })
        .where({ id })
        .execute();
    } else {
      await UsersEntity.createQueryBuilder()
        .update()
        .set({
          username: body.first_name || findUser.username,
          surname: body.last_name || findUser.surname,
          area: body.area || findUser.area,
          phone: findUser.phone,
        })
        .where({ id })
        .execute();
    }
  }

  async email(body: PasswordDto, id: string) {
    const randomSon = random();
    const findUser = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => null);
    if (findUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    await sendMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      id,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code sent via email',
      status: HttpStatus.OK,
    };
  }

  async emailCode(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const findUser: any = await UsersEntity.findOne({
      where: {
        email: redis.email,
      },
    }).catch(() => null);
    if (findUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const newUser: UpdateResult = await UsersEntity.createQueryBuilder()
      .update()
      .set({
        email: redis.email,
      })
      .where({
        id: redis.id,
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
      status: 201,
      token,
    };
  }

  async profile(id: string) {
    const user: any = await UsersEntity.findOneOrFail({
      where: {
        id,
      },
      relations: {
        open_course: {
          course_id: {
            discount: {
              take_user: true,
            },
            course_videos: true,
          },
          topik_id: {
            topik_videos: true,
          },
        },
      },
    }).catch(() => null);

    user.allVideos = 0;
    user.takeSertifikat = 0;
    user.course = await oneFor(user);
    for (let i = 0; i < user.course?.length; i++) {
      user.allVideos += user.course[i]?.total_lessons;
      user.takeSertifikat +=
        typeof user.course[i]?.sertifikat == 'string' ? 1 : 0;
    }
    user.takenCourse = takenCourse(user.course);
    return user;
  }

  async findOne(id: string) {
    const user: any = await UsersEntity.findOneOrFail({
      where: { id },
    });
    delete user.parol;
    delete user.auth_socials;
    return user;
  }

  async daromat() {
    const takes: any = await TakeEntity.find({
      relations: {
        course_id: true,
        topik_id: true,
      },
    }).catch(() => null);
    const allUsers = (await UsersEntity.find()).length;
    const takeSertifikat = (await TakenSertifikat.find()).length;

    let daromat = 0;
    let oylik = 0;
    for (let i = 0; i < takes.length; i++) {
      if (takes[i].course_id) {
        if (
          comparison(
            completionDate(takes[i].create_data, 1).split(' '),
            utilsDate(new Date()).split(' '),
          )
        ) {
          oylik += Number(takes[i].course_id?.price.split(' ').join(''));
        }
        daromat += Number(takes[i].course_id?.price.split(' ').join(''));
      } else {
        if (
          comparison(
            completionDate(takes[i].create_data, 1).split(' '),
            utilsDate(new Date()).split(' '),
          )
        ) {
          oylik += Number(takes[i].topik_id?.price.split(' ').join(''));
        }
        daromat += Number(takes[i].topik_id?.price.split(' ').join(''));
      }
    }

    return {
      annual_income: daromat,
      monthly_income: oylik,
      allUsers,
      takeSertifikat,
    };
  }

  async allUsers() {
    const allUsers = await UsersEntity.find({
      order: { email: 'ASC' },
    });
    for (let i = 0; i < allUsers.length; i++) {
      delete allUsers[i].parol;
    }
    return allUsers;
  }

  async allSearch(search: string) {
    const allUsers = await UsersEntity.find();
    const findSearch = allUsers.filter((e) => e.email.includes(search));
    return findSearch;
  }

  async statistika(id: string) {
    return await this.profile(id);
  }

  async remove(id: string) {
    await UsersEntity.findOneOrFail({ where: { id } });
    await UsersEntity.delete({ id });
  }
}
