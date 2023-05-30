import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { connectDb } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TokenAdminMiddleWare } from './middleware/token.admin.middleware';
import { TokenUserMiddleWare } from './middleware/token.user.middleware';
import { UsersModule } from './module/users/users.module';
import { VedioModule } from './module/vedio/vedio.module';
import { CoursesModule } from './module/courses/courses.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TestsModule } from './module/tests/tests.module';
import { DiscountModule } from './module/discount/discount.module';
import { UsersDiscountModule } from './module/users_discount/users_discount.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: '',
      },
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    UsersModule,
    VedioModule,
    CoursesModule,
    TestsModule,
    DiscountModule,
    UsersDiscountModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // User
    consumer
      .apply(TokenUserMiddleWare)
      .exclude(
        { path: '/user/registr', method: RequestMethod.POST },
        { path: '/user/registr/:id', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/login/email/:code', method: RequestMethod.GET },
        { path: '/user/firebase/registr', method: RequestMethod.POST },
        { path: '/user/firebase/login', method: RequestMethod.POST },
        { path: '/user/admin/login', method: RequestMethod.POST },
        { path: '/user/admin/login/:id', method: RequestMethod.GET },
        { path: '/courses/list', method: RequestMethod.GET },
        { path: '/user/password', method: RequestMethod.POST },
        { path: '/user/password/:code', method: RequestMethod.GET },
        { path: '/user/password/update', method: RequestMethod.PUT },
        { path: '/courses/create', method: RequestMethod.POST },
        { path: '/tests/admin', method: RequestMethod.GET },
        { path: '/tests', method: RequestMethod.POST },
        { path: '/tests/:id', method: RequestMethod.PATCH },
        { path: '/tests/:id', method: RequestMethod.DELETE },
        { path: '/vedio/all', method: RequestMethod.GET },
        { path: '/vedio/create', method: RequestMethod.POST },
        { path: '/discount', method: RequestMethod.GET },
        { path: '/discount', method: RequestMethod.POST },
        { path: '/discount/:id', method: RequestMethod.PATCH },
        { path: '/discount/:id', method: RequestMethod.DELETE },
        { path: '/users-discount', method: RequestMethod.GET },
        { path: '/users-discount', method: RequestMethod.POST },
        { path: '/users-discount/:id', method: RequestMethod.PATCH },
        { path: '/users-discount/:id', method: RequestMethod.DELETE },
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });

    // Admin
    consumer
      .apply(TokenAdminMiddleWare)
      .exclude(
        { path: '/courses/list', method: RequestMethod.GET },
        { path: '/courses/course/:id', method: RequestMethod.GET },
        { path: '/user/registr', method: RequestMethod.POST },
        { path: '/user/registr/:id', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/login/email/:code', method: RequestMethod.GET },
        { path: '/tests/user', method: RequestMethod.GET },
        { path: '/user/firebase/registr', method: RequestMethod.POST },
        { path: '/user/firebase/login', method: RequestMethod.POST },
        { path: '/user/admin/login', method: RequestMethod.POST },
        { path: '/user/admin/login/:id', method: RequestMethod.GET },
        { path: '/user/password', method: RequestMethod.POST },
        { path: '/user/password/:code', method: RequestMethod.GET },
        { path: '/user/password/update', method: RequestMethod.PUT },
        { path: '/user/update', method: RequestMethod.PATCH },
        { path: '/user/update/password', method: RequestMethod.PUT },
        { path: '/user/update/image', method: RequestMethod.PUT },
        { path: '/user/:course', method: RequestMethod.GET },
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
