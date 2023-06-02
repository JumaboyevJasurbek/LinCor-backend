import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Req,
  Param,
  Delete,
  HttpCode,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNoContentResponse,
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
import { PatchUserDto } from './dto/patch-all';
import { Request } from 'express';
import { InPasswordDto } from './dto/inPassword';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async register(@Body() body: RegistrDto) {
    return await this.usersService.register(body);
  }

  @Post('/register/:code')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.OK)
  async registerEmail(@Param('code') param: string) {
    return await this.usersService.registerEmailCode(param);
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
    return await this.usersService.loginEmailCode(params);
  }

  @Post('/firebase/register')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.OK)
  async FirebaseRegistr(@Body() body: FirebaseRegistrDto) {
    return await this.usersService.firebaseRegistr(body);
  }

  @Post('/firebase/login')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async FirebaseLogin(@Body() body: FirebaseLoginDto) {
    return await this.usersService.firebaseLogin(body);
  }

  @Post('/admin/login')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: AdminLoginDto) {
    return await this.usersService.adminEmailRequest(body);
  }

  @Get('/admin/login/:code')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async adminLoginEmail(@Param('code') params: string) {
    return await this.usersService.adminCodeRequest(params);
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

  @Put('/update/password')
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  async passwordIN(@Body() body: InPasswordDto, @Req() req: Request) {
    await this.usersService.passwordIN(req.user_id, body);
  }

  @Put('/update/image')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image'],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    await this.usersService.updateFile(file, req.user_id);
  }

  @Put('/email')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async email(@Body() body: PasswordDto, @Req() req: Request) {
    return await this.usersService.email(body, req.user_id);
  }

  @Put('/email/:code')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async emailCode(@Param('code') params: string) {
    return await this.usersService.emailCode(params);
  }

  @Patch('/update')
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  async patch(@Body() body: PatchUserDto, @Req() req: Request) {
    await this.usersService.patch(req.user_id, body);
  }

  @Get('/one')
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Req() req: Request) {
    return await this.usersService.findOne(req.user_id);
  }

  @Get('/profile')
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async profile(@Req() req: Request) {
    return await this.usersService.profile(req.user_id);
  }

  @Get('/statistika/daromat')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  async daromat() {
    return await this.usersService.daromat();
  }

  @Get('/statistika/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  async allUsers() {
    return await this.usersService.allUsers();
  }

  @Get('/statistika/search/:search')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  async allSearch(@Param('search') search: string) {
    return await this.usersService.allSearch(search);
  }

  @Get('/statistika/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  async statistika(@Param('id') id: string) {
    return await this.usersService.statistika(id);
  }

  @Delete('/delete/:id')
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
