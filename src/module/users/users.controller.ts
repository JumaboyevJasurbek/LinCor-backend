import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RegistrDto } from './dto/registr';
import { LoginDto } from './dto/login';
import { FirebaseRegistrDto } from './dto/firebase.registr';
import { FirebaseLoginDto } from './dto/firebase.login';
import { AdminLoginDto } from './dto/admin.login';
import { PasswordDto } from './dto/password-email';
import { PasswordUpdateDto } from './dto/password-update';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registr')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async registr(@Body() body: RegistrDto) {
    return await this.usersService.registr(body);
  }

  @Post('/registr/:code')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.OK)
  async registrEmail(@Param('code') param: string) {
    return await this.usersService.registr_email(param);
  }

  @Post('/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return await this.usersService.login(body);
  }

  @Get('/login/email/:code')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async loginEmail(@Param('code') params: string) {
    return await this.usersService.login_email(params);
  }

  @Post('/firebase/registr')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.OK)
  async FirebaseRegistr(@Body() body: FirebaseRegistrDto) {
    return await this.usersService.firebase_registr(body);
  }

  @Post('/firebase/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async FirebaseLogin(@Body() body: FirebaseLoginDto) {
    return await this.usersService.firebase_login(body);
  }

  @Post('/admin/login')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: AdminLoginDto) {
    return await this.usersService.admin_login(body);
  }

  @Get('/admin/login/:code')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async adminLoginEmail(@Param('code') params: string) {
    return await this.usersService.admin_login_email(params);
  }

  @Post('/password')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async password(@Body() body: PasswordDto) {
    return await this.usersService.password(body);
  }

  @Get('/password/:code')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async passwordCode(@Param('code') params: string) {
    return await this.usersService.passwordCode(params);
  }

  @Put('/password/update')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async passwordUpdate(@Body() body: PasswordUpdateDto) {
    return await this.usersService.passwordUpdate(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
