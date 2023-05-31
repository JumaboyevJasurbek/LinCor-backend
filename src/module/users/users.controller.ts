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
import { googleCloud } from 'src/utils/google-cloud';

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
    return await this.usersService.patch(req.user_id, body);
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
    console.log(req.user_id);
    return await this.usersService.passwordIN(req.user_id, body);
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
    try {
      const bool = googleCloud(file);
      if (bool) {
        await this.usersService.updateFile(bool, req.user_id);
      }
    } catch (error) {
      console.log(error);
    }
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
    return await this.usersService.remove(id);
  }
}
