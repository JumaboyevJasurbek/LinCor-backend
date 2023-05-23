import { PartialType } from '@nestjs/swagger';
import { CreateVedioDto } from './create-vedio.dto';

export class UpdateVedioDto extends PartialType(CreateVedioDto) {}
