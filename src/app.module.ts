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
import { JwtModule } from '@nestjs/jwt';
import { TokenAdminMiddleWare } from './middleware/token.admin.middleware';
import { TokenUserMiddleWare } from './middleware/token.user.middleware';
import { UsersModule } from './module/users/users.module';
import { CoursesModule } from './module/courses/courses.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TestsModule } from './module/tests/tests.module';
import * as dotenv from 'dotenv';
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
    CoursesModule,
    TestsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // User
    consumer
      .apply(TokenUserMiddleWare)
      .exclude(
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/courses/list', method: RequestMethod.GET },
        { path: '/courses/create', method: RequestMethod.POST },
        { path: '/user/registr', method: RequestMethod.POST },
        { path: '/user/registr/:id', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/login/email/:code', method: RequestMethod.GET },
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });

    // Admin
    consumer
      .apply(TokenAdminMiddleWare)
      .exclude(
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/user/:id', method: RequestMethod.POST },
        { path: '/courses/list', method: RequestMethod.GET },
        { path: '/courses/create', method: RequestMethod.POST },
        { path: '/user/registr', method: RequestMethod.POST },
        { path: '/user/registr/:id', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
        { path: '/user/login/email/:code', method: RequestMethod.GET },
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
