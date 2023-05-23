import { Module } from '@nestjs/common';
import { connectDb } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
})
export class AppModule {}
