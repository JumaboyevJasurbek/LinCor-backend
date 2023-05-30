import * as bcrypt from 'bcrypt';
import senMail from 'src/utils/nodemailer';
import Redis from 'ioredis';
import jwt from 'src/utils/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrDto } from './dto/registr';
import { random } from 'src/utils/random';
import { UsersEntity } from 'src/entities/users.entity';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { InsertResult, UpdateResult } from 'typeorm';
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
import { taqqoslash } from 'src/utils/taqqoslash';
import { TakenSertifikat } from 'src/entities/taken.sertifikat';

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
    }).catch(() => null);

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
    }).catch(() => null);
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
    }).catch(() => null);
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
    }).catch(() => null);
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
    }).catch(() => null);

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
    }).catch(() => null);
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

  async password(body: PasswordDto) {
    const randomSon = random();
    const findUser = await UsersEntity.findOne({
      where: {
        email: body.email,
      },
    }).catch(() => null);
    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async passwordCode(random: string) {
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
    if (!findUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Password togri',
      status: 200,
    };
  }

  async passwordUpdate(body: PasswordUpdateDto) {
    const random = body.code;
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
    if (!findUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
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
      status: 200,
    };
  }

  async passwordIN(id: string, body: InPasswordDto) {
    const findUser: any = await UsersEntity.findOne({
      where: {
        id,
      },
    }).catch(() => null);
    if (!findUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
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
      status: 200,
    };
  }

  async updateFile(file: string, id: string) {
    await UsersEntity.createQueryBuilder()
      .update()
      .set({
        image: file,
      })
      .where({
        id,
      })
      .execute();
  }

  async patch(userId: string, body: PatchUserDto) {
    const findUser: any = await UsersEntity.findOne({
      where: {
        id: userId,
      },
    }).catch(() => null);
    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    if (body?.phone) {
      const phone = Number(body?.phone.split(' ').join(''));
      if (!phone) {
        throw new HttpException('Phone Wrong format', HttpStatus.BAD_REQUEST);
      }

      if (String(phone).length > 9) {
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
        .where({
          id: userId,
        })
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
        .where({
          id: userId,
        })
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

    await senMail(body.email, randomSon);

    const newObj = {
      email: body.email,
      id,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
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
    const user: any = await UsersEntity.findOne({
      where: {
        id,
      },
      relations: {
        open_course: {
          course_id: {
            discount: {
              taken: true,
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
    const user: any = await UsersEntity.findOne({
      where: {
        id,
      },
    }).catch(() => null);
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
          taqqoslash(
            completionDate(takes[i].create_data, 1).split(' '),
            utilsDate(new Date()).split(' '),
          )
        ) {
          oylik += Number(takes[i].course_id?.price.split(' ').join(''));
        }
        daromat += Number(takes[i].course_id?.price.split(' ').join(''));
      } else {
        if (
          taqqoslash(
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
    const allUsers = await UsersEntity.find();
    for (let i = 0; i < allUsers.length; i++) {
      delete allUsers[i].parol;
    }
    return allUsers;
  }

  async statistika(id: string) {
    return await this.profile(id);
  }

  async remove(id: string) {
    const findUser = await UsersEntity.findOne({
      where: {
        id,
      },
    }).catch(() => null);
    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    await UsersEntity.createQueryBuilder()
      .delete()
      .where({
        id,
      })
      .execute();
  }
}
