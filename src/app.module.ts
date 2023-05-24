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
import * as dotenv from 'dotenv';
import { TokenAdminMiddleWare } from './middleware/token.admin.middleware';
import { TokenUserMiddleWare } from './middleware/token.user.middleware';
import { UsersModule } from './module/users/users.module';
import { CoursesModule } from './module/courses/courses.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    UsersModule,
    CoursesModule,
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
      )
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
