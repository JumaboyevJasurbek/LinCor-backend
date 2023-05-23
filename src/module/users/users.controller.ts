import {
  Controller,
  Get,
  Post,
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
