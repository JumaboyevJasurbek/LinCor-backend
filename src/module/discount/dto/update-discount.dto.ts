import { PartialType } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';
import { IsNumber, IsString } from 'class-validator';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { EntityListenerMetadataArgs } from 'typeorm/metadata-args/EntityListenerMetadataArgs';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
  @IsNumber()
  percentage: number;

  course_id: any;
}
